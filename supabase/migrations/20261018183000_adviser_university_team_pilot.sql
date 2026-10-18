-- Adviser / University team pilot.
-- All team mutations and team-data reads go through narrowly scoped RPCs.
-- The browser receives no direct table privileges for these records.

CREATE SCHEMA IF NOT EXISTS extensions;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;

CREATE TABLE public.organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (length(trim(name)) BETWEEN 2 AND 120),
  kind text NOT NULL CHECK (kind IN ('adviser', 'university')),
  created_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.organization_members (
  organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
  joined_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (organization_id, user_id)
);

CREATE TABLE public.organization_invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  invitee_email text NOT NULL CHECK (invitee_email = lower(trim(invitee_email))),
  invite_type text NOT NULL CHECK (invite_type IN ('staff', 'student')),
  staff_role text,
  token_hash bytea NOT NULL UNIQUE,
  created_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL,
  accepted_at timestamptz,
  accepted_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  revoked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (
    (invite_type = 'staff' AND staff_role IS NOT NULL AND staff_role IN ('admin', 'member')) OR
    (invite_type = 'student' AND staff_role IS NULL)
  ),
  CHECK (accepted_at IS NULL OR revoked_at IS NULL)
);

CREATE TABLE public.organization_student_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  invitation_id uuid NOT NULL REFERENCES public.organization_invites(id) ON DELETE RESTRICT,
  invited_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  consent_version text NOT NULL,
  consent_purpose text NOT NULL,
  consent_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX organization_student_access_one_active
  ON public.organization_student_access (organization_id, student_id)
  WHERE revoked_at IS NULL;
CREATE INDEX organization_members_by_user ON public.organization_members (user_id, organization_id);
CREATE INDEX organization_invites_by_org ON public.organization_invites (organization_id, created_at DESC);
CREATE INDEX organization_invites_by_expiry ON public.organization_invites (expires_at);
CREATE INDEX organization_student_access_by_student
  ON public.organization_student_access (student_id, organization_id);

CREATE TABLE public.organization_billing_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  created_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  contact_name text NOT NULL CHECK (length(trim(contact_name)) BETWEEN 1 AND 120),
  contact_email text NOT NULL CHECK (contact_email = lower(trim(contact_email))),
  seat_estimate integer NOT NULL CHECK (seat_estimate BETWEEN 1 AND 500),
  message text NOT NULL DEFAULT '' CHECK (length(message) <= 2000),
  status text NOT NULL DEFAULT 'demo_request_received' CHECK (status = 'demo_request_received'),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_student_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_billing_requests ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.organizations FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.organization_members FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.organization_invites FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.organization_student_access FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.organization_billing_requests FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION private.is_organization_member(_organization_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.organization_members AS m
    WHERE m.organization_id = _organization_id
      AND m.user_id = _user_id
  );
$$;

CREATE OR REPLACE FUNCTION private.is_organization_admin(_organization_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.organization_members AS m
    WHERE m.organization_id = _organization_id
      AND m.user_id = _user_id
      AND m.role IN ('owner', 'admin')
  );
$$;

CREATE OR REPLACE FUNCTION private.can_review_student(_organization_id uuid, _student_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT private.is_organization_member(_organization_id, _user_id)
    AND EXISTS (
      SELECT 1
      FROM public.organization_student_access AS a
      WHERE a.organization_id = _organization_id
        AND a.student_id = _student_id
        AND a.revoked_at IS NULL
  );
$$;

CREATE OR REPLACE FUNCTION private.has_confirmed_email(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users AS u
    WHERE u.id = _user_id AND u.email_confirmed_at IS NOT NULL
  );
$$;

REVOKE ALL ON FUNCTION private.is_organization_member(uuid, uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION private.is_organization_admin(uuid, uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION private.can_review_student(uuid, uuid, uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION private.has_confirmed_email(uuid) FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.create_team_organization(p_name text, p_kind text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_organization_id uuid;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Sign in to create a team workspace.' USING ERRCODE = '28000';
  END IF;
  IF NOT private.has_confirmed_email(v_user_id) THEN
    RAISE EXCEPTION 'Confirm your email address before creating a team workspace.' USING ERRCODE = '42501';
  END IF;
  IF p_kind IS NULL OR p_kind NOT IN ('adviser', 'university') THEN
    RAISE EXCEPTION 'Choose Adviser or University as the workspace type.' USING ERRCODE = '22023';
  END IF;
  IF p_name IS NULL OR length(trim(p_name)) NOT BETWEEN 2 AND 120 THEN
    RAISE EXCEPTION 'Workspace name must be between 2 and 120 characters.' USING ERRCODE = '22023';
  END IF;

  INSERT INTO public.organizations (name, kind, created_by)
  VALUES (trim(p_name), p_kind, v_user_id)
  RETURNING id INTO v_organization_id;

  INSERT INTO public.organization_members (organization_id, user_id, role)
  VALUES (v_organization_id, v_user_id, 'owner');

  RETURN v_organization_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.list_my_team_organizations()
RETURNS TABLE (organization_id uuid, name text, kind text, member_role text, created_at timestamptz)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT o.id, o.name, o.kind, m.role, o.created_at
  FROM public.organization_members AS m
  JOIN public.organizations AS o ON o.id = m.organization_id
  WHERE m.user_id = auth.uid()
  ORDER BY o.created_at DESC;
$$;

CREATE OR REPLACE FUNCTION public.create_team_invite(
  p_organization_id uuid,
  p_invitee_email text,
  p_invite_type text,
  p_staff_role text DEFAULT NULL
)
RETURNS TABLE (invite_id uuid, raw_token text, expires_at timestamptz)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_email text := lower(trim(coalesce(p_invitee_email, '')));
  v_token text;
  v_id uuid;
  v_expires_at timestamptz := now() + interval '7 days';
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Sign in to invite a team member.' USING ERRCODE = '28000';
  END IF;
  IF NOT private.is_organization_admin(p_organization_id, v_user_id) THEN
    RAISE EXCEPTION 'Only workspace owners and admins can send invitations.' USING ERRCODE = '42501';
  END IF;
  IF v_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' THEN
    RAISE EXCEPTION 'Enter a valid email address.' USING ERRCODE = '22023';
  END IF;
  IF p_invite_type IS NULL OR p_invite_type NOT IN ('staff', 'student') THEN
    RAISE EXCEPTION 'Choose a staff or student invitation.' USING ERRCODE = '22023';
  END IF;
  IF (p_invite_type = 'staff' AND (p_staff_role IS NULL OR p_staff_role NOT IN ('admin', 'member'))) OR
     (p_invite_type = 'student' AND p_staff_role IS NOT NULL) THEN
    RAISE EXCEPTION 'The requested invitation role is not allowed.' USING ERRCODE = '22023';
  END IF;
  PERFORM 1 FROM public.organizations AS o WHERE o.id = p_organization_id FOR UPDATE;
  IF EXISTS (
    SELECT 1 FROM public.organization_invites AS i
    WHERE i.organization_id = p_organization_id
      AND i.invitee_email = v_email
      AND i.invite_type = p_invite_type
      AND i.accepted_at IS NULL
      AND i.revoked_at IS NULL
      AND i.expires_at > now()
  ) THEN
    RAISE EXCEPTION 'A valid invitation for this email is already pending.' USING ERRCODE = '23505';
  END IF;

  v_token := encode(extensions.gen_random_bytes(32), 'hex');
  INSERT INTO public.organization_invites (
    organization_id, invitee_email, invite_type, staff_role, token_hash, created_by, expires_at
  ) VALUES (
    p_organization_id, v_email, p_invite_type, p_staff_role,
    extensions.digest(convert_to(v_token, 'UTF8'), 'sha256'), v_user_id, v_expires_at
  ) RETURNING id INTO v_id;

  RETURN QUERY SELECT v_id, v_token, v_expires_at;
END;
$$;

CREATE OR REPLACE FUNCTION public.preview_team_invite(p_token text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_invite public.organization_invites%ROWTYPE;
  v_organization public.organizations%ROWTYPE;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Sign in with the invited email to view this invitation.' USING ERRCODE = '28000';
  END IF;
  IF NOT private.has_confirmed_email(auth.uid()) THEN
    RAISE EXCEPTION 'Confirm your email address before viewing this invitation.' USING ERRCODE = '42501';
  END IF;
  IF p_token IS NULL OR p_token !~ '^[0-9a-f]{64}$' THEN
    RAISE EXCEPTION 'This invitation link is invalid.' USING ERRCODE = '22023';
  END IF;
  SELECT i.* INTO v_invite
  FROM public.organization_invites AS i
  WHERE i.token_hash = extensions.digest(convert_to(p_token, 'UTF8'), 'sha256')
    AND lower(i.invitee_email) = lower(coalesce(auth.jwt() ->> 'email', ''))
    AND i.accepted_at IS NULL
    AND i.revoked_at IS NULL
    AND i.expires_at > now();
  IF NOT FOUND THEN
    RAISE EXCEPTION 'This invitation is invalid, expired, already used, or addressed to another email.' USING ERRCODE = '22023';
  END IF;
  SELECT o.* INTO v_organization FROM public.organizations AS o WHERE o.id = v_invite.organization_id;
  RETURN jsonb_build_object(
    'organization_id', v_organization.id,
    'organization_name', v_organization.name,
    'organization_kind', v_organization.kind,
    'invite_type', v_invite.invite_type,
    'staff_role', v_invite.staff_role,
    'invited_email', v_invite.invitee_email,
    'expires_at', v_invite.expires_at,
    'consent_version', CASE WHEN v_invite.invite_type = 'student' THEN 'team-review-summary-v1' ELSE NULL END,
    'consent_purpose', CASE WHEN v_invite.invite_type = 'student' THEN
      'I agree to share my display name, selected programmes (including shortlist and tier), application statuses, tasks, and deadlines with this organization. Its team members have read-only access. Private notes, document links, and files are excluded. I can revoke access later in Settings; revoking stops future access but cannot recall information already viewed or copied.'
      ELSE NULL END
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.accept_team_invite(p_token text, p_student_consent boolean DEFAULT false)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_invite public.organization_invites%ROWTYPE;
  v_email text := lower(coalesce(auth.jwt() ->> 'email', ''));
  v_consent_purpose text := 'I agree to share my display name, selected programmes (including shortlist and tier), application statuses, tasks, and deadlines with this organization. Its team members have read-only access. Private notes, document links, and files are excluded. I can revoke access later in Settings; revoking stops future access but cannot recall information already viewed or copied.';
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Sign in with the invited email to accept this invitation.' USING ERRCODE = '28000';
  END IF;
  IF NOT private.has_confirmed_email(v_user_id) THEN
    RAISE EXCEPTION 'Confirm your email address before accepting this invitation.' USING ERRCODE = '42501';
  END IF;
  IF p_token IS NULL OR p_token !~ '^[0-9a-f]{64}$' THEN
    RAISE EXCEPTION 'This invitation link is invalid.' USING ERRCODE = '22023';
  END IF;

  SELECT i.* INTO v_invite
  FROM public.organization_invites AS i
  WHERE i.token_hash = extensions.digest(convert_to(p_token, 'UTF8'), 'sha256')
  FOR UPDATE;
  IF NOT FOUND OR v_invite.accepted_at IS NOT NULL OR v_invite.revoked_at IS NOT NULL OR v_invite.expires_at <= now() THEN
    RAISE EXCEPTION 'This invitation is invalid, expired, or already used.' USING ERRCODE = '22023';
  END IF;
  IF lower(v_invite.invitee_email) <> v_email THEN
    RAISE EXCEPTION 'Sign in with the email address this invitation was sent to.' USING ERRCODE = '42501';
  END IF;

  IF v_invite.invite_type = 'staff' THEN
    INSERT INTO public.organization_members (organization_id, user_id, role)
    VALUES (v_invite.organization_id, v_user_id, v_invite.staff_role)
    ON CONFLICT (organization_id, user_id) DO NOTHING;
  ELSE
    IF p_student_consent IS DISTINCT FROM true THEN
      RAISE EXCEPTION 'Confirm the student data-sharing consent before joining.' USING ERRCODE = '42501';
    END IF;
    IF EXISTS (
      SELECT 1 FROM public.organization_student_access AS a
      WHERE a.organization_id = v_invite.organization_id
        AND a.student_id = v_user_id
        AND a.revoked_at IS NULL
    ) THEN
      RAISE EXCEPTION 'You already have active access with this organization.' USING ERRCODE = '23505';
    END IF;
    INSERT INTO public.organization_student_access (
      organization_id, student_id, invitation_id, invited_by,
      consent_version, consent_purpose, consent_at
    ) VALUES (
      v_invite.organization_id, v_user_id, v_invite.id, v_invite.created_by,
      'team-review-summary-v1', v_consent_purpose, now()
    );
  END IF;

  UPDATE public.organization_invites
  SET accepted_at = now(), accepted_by = v_user_id
  WHERE id = v_invite.id;

  RETURN jsonb_build_object(
    'organization_id', v_invite.organization_id,
    'invite_type', v_invite.invite_type,
    'staff_role', v_invite.staff_role
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.list_team_members(p_organization_id uuid)
RETURNS TABLE (user_id uuid, email text, display_name text, member_role text, joined_at timestamptz)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NOT private.is_organization_member(p_organization_id, auth.uid()) THEN
    RAISE EXCEPTION 'You are not a member of this workspace.' USING ERRCODE = '42501';
  END IF;
  RETURN QUERY
  SELECT m.user_id, u.email::text, p.display_name, m.role, m.joined_at
  FROM public.organization_members AS m
  JOIN auth.users AS u ON u.id = m.user_id
  LEFT JOIN public.profiles AS p ON p.id = m.user_id
  WHERE m.organization_id = p_organization_id
  ORDER BY CASE m.role WHEN 'owner' THEN 0 WHEN 'admin' THEN 1 ELSE 2 END, m.joined_at;
END;
$$;

CREATE OR REPLACE FUNCTION public.list_team_invites(p_organization_id uuid)
RETURNS TABLE (
  invite_id uuid, invitee_email text, invite_type text, staff_role text,
  invite_status text, expires_at timestamptz, accepted_at timestamptz, created_at timestamptz
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NOT private.is_organization_admin(p_organization_id, auth.uid()) THEN
    RAISE EXCEPTION 'Only workspace owners and admins can view invitations.' USING ERRCODE = '42501';
  END IF;
  RETURN QUERY
  SELECT i.id, i.invitee_email, i.invite_type, i.staff_role,
    CASE
      WHEN i.revoked_at IS NOT NULL THEN 'revoked'
      WHEN i.accepted_at IS NOT NULL THEN 'accepted'
      WHEN i.expires_at <= now() THEN 'expired'
      ELSE 'pending'
    END,
    i.expires_at, i.accepted_at, i.created_at
  FROM public.organization_invites AS i
  WHERE i.organization_id = p_organization_id
  ORDER BY i.created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION public.revoke_team_invite(p_organization_id uuid, p_invite_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE v_updated integer;
BEGIN
  IF NOT private.is_organization_admin(p_organization_id, auth.uid()) THEN
    RAISE EXCEPTION 'Only workspace owners and admins can revoke invitations.' USING ERRCODE = '42501';
  END IF;
  UPDATE public.organization_invites
  SET revoked_at = now()
  WHERE id = p_invite_id
    AND organization_id = p_organization_id
    AND accepted_at IS NULL
    AND revoked_at IS NULL;
  GET DIAGNOSTICS v_updated = ROW_COUNT;
  RETURN v_updated = 1;
END;
$$;

CREATE OR REPLACE FUNCTION public.remove_team_member(p_organization_id uuid, p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_actor_role text;
  v_target_role text;
  v_deleted integer;
BEGIN
  SELECT m.role INTO v_actor_role
  FROM public.organization_members AS m
  WHERE m.organization_id = p_organization_id AND m.user_id = auth.uid();
  IF v_actor_role IS NULL THEN
    RAISE EXCEPTION 'You are not a member of this workspace.' USING ERRCODE = '42501';
  END IF;
  SELECT m.role INTO v_target_role
  FROM public.organization_members AS m
  WHERE m.organization_id = p_organization_id AND m.user_id = p_user_id;
  IF v_target_role IS NULL OR v_target_role = 'owner' OR p_user_id = auth.uid() THEN
    RETURN false;
  END IF;
  IF v_actor_role = 'owner' OR (v_actor_role = 'admin' AND v_target_role = 'member') THEN
    DELETE FROM public.organization_members
    WHERE organization_id = p_organization_id AND user_id = p_user_id;
    GET DIAGNOSTICS v_deleted = ROW_COUNT;
    RETURN v_deleted = 1;
  END IF;
  RAISE EXCEPTION 'Your workspace role cannot remove this member.' USING ERRCODE = '42501';
END;
$$;

CREATE OR REPLACE FUNCTION public.list_team_students(p_organization_id uuid)
RETURNS TABLE (
  student_id uuid, display_name text, consent_at timestamptz,
  programme_count bigint, open_task_count bigint, next_deadline date
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NOT private.is_organization_member(p_organization_id, auth.uid()) THEN
    RAISE EXCEPTION 'You are not a member of this workspace.' USING ERRCODE = '42501';
  END IF;
  RETURN QUERY
  SELECT a.student_id,
    COALESCE(p.display_name, 'Student'),
    a.consent_at,
    (SELECT count(*) FROM public.applications AS ap WHERE ap.user_id = a.student_id),
    (SELECT count(*) FROM public.tasks AS t WHERE t.user_id = a.student_id AND t.done = false),
    (SELECT min(d.due_date) FROM public.deadlines AS d WHERE d.owner_id = a.student_id AND d.due_date >= current_date)
  FROM public.organization_student_access AS a
  LEFT JOIN public.profiles AS p ON p.id = a.student_id
  WHERE a.organization_id = p_organization_id
    AND a.revoked_at IS NULL
  ORDER BY p.display_name NULLS LAST, a.consent_at;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_team_student_workspace(p_organization_id uuid, p_student_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_profile public.profiles%ROWTYPE;
  v_workspace jsonb;
BEGIN
  IF NOT private.can_review_student(p_organization_id, p_student_id, auth.uid()) THEN
    RAISE EXCEPTION 'This student has not shared an active plan with your workspace.' USING ERRCODE = '42501';
  END IF;
  SELECT p.* INTO v_profile FROM public.profiles AS p WHERE p.id = p_student_id;

  SELECT jsonb_build_object(
    'student_id', p_student_id,
    'display_name', COALESCE(v_profile.display_name, 'Student'),
    'applications', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'status', a.status,
        'shortlisted', a.shortlisted,
        'tier', a.tier,
        'programme_name', pr.name,
        'degree', pr.degree,
        'university_name', u.name,
        'country', u.country,
        'intake', pr.intake
      ) ORDER BY a.updated_at DESC)
      FROM public.applications AS a
      LEFT JOIN public.programmes AS pr ON pr.id = a.programme_id
      LEFT JOIN public.universities AS u ON u.id = pr.university_id
      WHERE a.user_id = p_student_id
    ), '[]'::jsonb),
    'open_tasks', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'title', t.title, 'due_date', t.due_date
      ) ORDER BY t.due_date NULLS LAST, t.title)
      FROM public.tasks AS t
      WHERE t.user_id = p_student_id AND t.done = false
    ), '[]'::jsonb),
    'upcoming_deadlines', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'label', d.label, 'due_date', d.due_date
      ) ORDER BY d.due_date)
      FROM public.deadlines AS d
      WHERE d.owner_id = p_student_id AND d.due_date >= current_date
    ), '[]'::jsonb)
  ) INTO v_workspace;
  RETURN v_workspace;
END;
$$;

CREATE OR REPLACE FUNCTION public.list_my_team_consents()
RETURNS TABLE (
  access_id uuid, organization_id uuid, organization_name text, organization_kind text,
  consent_purpose text, consent_at timestamptz, revoked_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT a.id, o.id, o.name, o.kind, a.consent_purpose, a.consent_at, a.revoked_at
  FROM public.organization_student_access AS a
  JOIN public.organizations AS o ON o.id = a.organization_id
  WHERE a.student_id = auth.uid()
  ORDER BY a.consent_at DESC;
$$;

CREATE OR REPLACE FUNCTION public.revoke_my_team_access(p_access_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE v_updated integer;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Sign in to manage shared access.' USING ERRCODE = '28000';
  END IF;
  UPDATE public.organization_student_access
  SET revoked_at = now()
  WHERE id = p_access_id
    AND student_id = auth.uid()
    AND revoked_at IS NULL;
  GET DIAGNOSTICS v_updated = ROW_COUNT;
  RETURN v_updated = 1;
END;
$$;

CREATE OR REPLACE FUNCTION public.create_team_billing_request(
  p_organization_id uuid,
  p_contact_name text,
  p_contact_email text,
  p_seat_estimate integer,
  p_message text DEFAULT ''
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_id uuid;
  v_email text := lower(trim(coalesce(p_contact_email, '')));
BEGIN
  IF NOT private.is_organization_admin(p_organization_id, auth.uid()) THEN
    RAISE EXCEPTION 'Only workspace owners and admins can submit billing inquiries.' USING ERRCODE = '42501';
  END IF;
  IF p_contact_name IS NULL OR length(trim(p_contact_name)) NOT BETWEEN 1 AND 120 THEN
    RAISE EXCEPTION 'Enter a contact name (up to 120 characters).' USING ERRCODE = '22023';
  END IF;
  IF v_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' THEN
    RAISE EXCEPTION 'Enter a valid contact email address.' USING ERRCODE = '22023';
  END IF;
  IF p_seat_estimate IS NULL OR p_seat_estimate NOT BETWEEN 1 AND 500 THEN
    RAISE EXCEPTION 'Seat estimate must be between 1 and 500.' USING ERRCODE = '22023';
  END IF;
  IF length(coalesce(p_message, '')) > 2000 THEN
    RAISE EXCEPTION 'Message must be 2,000 characters or fewer.' USING ERRCODE = '22023';
  END IF;

  INSERT INTO public.organization_billing_requests (
    organization_id, created_by, contact_name, contact_email, seat_estimate, message
  ) VALUES (
    p_organization_id, auth.uid(), trim(p_contact_name), v_email, p_seat_estimate, coalesce(p_message, '')
  ) RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.list_team_billing_requests(p_organization_id uuid)
RETURNS TABLE (
  request_id uuid, contact_name text, contact_email text, seat_estimate integer,
  message text, request_status text, created_at timestamptz
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NOT private.is_organization_admin(p_organization_id, auth.uid()) THEN
    RAISE EXCEPTION 'Only workspace owners and admins can view billing inquiries.' USING ERRCODE = '42501';
  END IF;
  RETURN QUERY
  SELECT r.id, r.contact_name, r.contact_email, r.seat_estimate, r.message, r.status, r.created_at
  FROM public.organization_billing_requests AS r
  WHERE r.organization_id = p_organization_id
  ORDER BY r.created_at DESC;
END;
$$;

-- The old adviser policy permitted updates to every application column, although the UI
-- only intended to save adviser_comment. Replace it with a narrowly scoped RPC.
DROP POLICY IF EXISTS "adviser comments" ON public.applications;

CREATE OR REPLACE FUNCTION public.save_adviser_feedback(p_application_id uuid, p_comment text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_student_id uuid;
  v_updated integer;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Sign in to save adviser feedback.' USING ERRCODE = '28000';
  END IF;
  IF p_comment IS NULL OR length(p_comment) > 4000 THEN
    RAISE EXCEPTION 'Feedback must be 4,000 characters or fewer.' USING ERRCODE = '22023';
  END IF;
  SELECT a.user_id INTO v_student_id
  FROM public.applications AS a
  WHERE a.id = p_application_id;
  IF v_student_id IS NULL OR NOT public.is_adviser_for(v_student_id) THEN
    RAISE EXCEPTION 'You are not an adviser for this application.' USING ERRCODE = '42501';
  END IF;
  UPDATE public.applications
  SET adviser_comment = p_comment
  WHERE id = p_application_id AND user_id = v_student_id;
  GET DIAGNOSTICS v_updated = ROW_COUNT;
  RETURN v_updated = 1;
END;
$$;

REVOKE ALL ON FUNCTION public.create_team_organization(text, text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.list_my_team_organizations() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.create_team_invite(uuid, text, text, text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.preview_team_invite(text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.accept_team_invite(text, boolean) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.list_team_members(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.list_team_invites(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.revoke_team_invite(uuid, uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.remove_team_member(uuid, uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.list_team_students(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.get_team_student_workspace(uuid, uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.list_my_team_consents() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.revoke_my_team_access(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.create_team_billing_request(uuid, text, text, integer, text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.list_team_billing_requests(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.save_adviser_feedback(uuid, text) FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION public.create_team_organization(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.list_my_team_organizations() TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_team_invite(uuid, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.preview_team_invite(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.accept_team_invite(text, boolean) TO authenticated;
GRANT EXECUTE ON FUNCTION public.list_team_members(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.list_team_invites(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.revoke_team_invite(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.remove_team_member(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.list_team_students(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_team_student_workspace(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.list_my_team_consents() TO authenticated;
GRANT EXECUTE ON FUNCTION public.revoke_my_team_access(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_team_billing_request(uuid, text, text, integer, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.list_team_billing_requests(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.save_adviser_feedback(uuid, text) TO authenticated;
