
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  display_name text,
  role text NOT NULL DEFAULT 'student',
  plan text NOT NULL DEFAULT 'free',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid());

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name) VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email,'@',1)));
  RETURN NEW;
END $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.universities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid,
  name text NOT NULL,
  country text NOT NULL DEFAULT '',
  city text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.universities TO authenticated;
GRANT ALL ON public.universities TO service_role;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read catalog or own" ON public.universities FOR SELECT TO authenticated USING (owner_id IS NULL OR owner_id = auth.uid());
CREATE POLICY "write own" ON public.universities FOR ALL TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());

CREATE TABLE public.programmes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid,
  university_id uuid NOT NULL REFERENCES public.universities(id) ON DELETE CASCADE,
  name text NOT NULL,
  degree text NOT NULL DEFAULT 'MSc',
  duration_months int NOT NULL DEFAULT 12,
  tuition int NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'GBP',
  intake text NOT NULL DEFAULT 'September 2027',
  study_mode text NOT NULL DEFAULT 'Full-time',
  min_gpa numeric,
  english_test text NOT NULL DEFAULT '',
  references_required int NOT NULL DEFAULT 2,
  portfolio_required boolean NOT NULL DEFAULT false,
  interview boolean NOT NULL DEFAULT false,
  application_fee int NOT NULL DEFAULT 0,
  summary text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.programmes TO authenticated;
GRANT ALL ON public.programmes TO service_role;
ALTER TABLE public.programmes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read catalog or own" ON public.programmes FOR SELECT TO authenticated USING (owner_id IS NULL OR owner_id = auth.uid());
CREATE POLICY "write own" ON public.programmes FOR ALL TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());

CREATE TABLE public.requirements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid,
  programme_id uuid NOT NULL REFERENCES public.programmes(id) ON DELETE CASCADE,
  label text NOT NULL,
  detail text NOT NULL DEFAULT '',
  doc_type text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.requirements TO authenticated;
GRANT ALL ON public.requirements TO service_role;
ALTER TABLE public.requirements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read catalog or own" ON public.requirements FOR SELECT TO authenticated USING (owner_id IS NULL OR owner_id = auth.uid());
CREATE POLICY "write own" ON public.requirements FOR ALL TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());

CREATE TABLE public.deadlines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid,
  programme_id uuid REFERENCES public.programmes(id) ON DELETE CASCADE,
  label text NOT NULL,
  due_date date NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.deadlines TO authenticated;
GRANT ALL ON public.deadlines TO service_role;
ALTER TABLE public.deadlines ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read catalog or own" ON public.deadlines FOR SELECT TO authenticated USING (owner_id IS NULL OR owner_id = auth.uid());
CREATE POLICY "write own" ON public.deadlines FOR ALL TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());

-- Adviser sharing
CREATE TABLE public.adviser_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL,
  adviser_email text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (student_id, adviser_email)
);
GRANT SELECT, INSERT, DELETE ON public.adviser_links TO authenticated;
GRANT ALL ON public.adviser_links TO service_role;
ALTER TABLE public.adviser_links ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_adviser_for(_student uuid) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.adviser_links WHERE student_id = _student AND lower(adviser_email) = lower(coalesce(auth.jwt()->>'email','')))
$$;

CREATE POLICY "student manages" ON public.adviser_links FOR ALL TO authenticated USING (student_id = auth.uid()) WITH CHECK (student_id = auth.uid());
CREATE POLICY "adviser sees" ON public.adviser_links FOR SELECT TO authenticated USING (lower(adviser_email) = lower(coalesce(auth.jwt()->>'email','')));

CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  programme_id uuid NOT NULL REFERENCES public.programmes(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'researching',
  priority int NOT NULL DEFAULT 2,
  shortlisted boolean NOT NULL DEFAULT false,
  adviser_comment text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, programme_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.applications TO authenticated;
GRANT ALL ON public.applications TO service_role;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own apps" ON public.applications FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "adviser reads" ON public.applications FOR SELECT TO authenticated USING (public.is_adviser_for(user_id));
CREATE POLICY "adviser comments" ON public.applications FOR UPDATE TO authenticated USING (public.is_adviser_for(user_id)) WITH CHECK (public.is_adviser_for(user_id));

CREATE TABLE public.status_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  status text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.status_records TO authenticated;
GRANT ALL ON public.status_records TO service_role;
ALTER TABLE public.status_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own status" ON public.status_records FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_adviser_for(user_id));

CREATE OR REPLACE FUNCTION public.log_status() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' OR NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.status_records (application_id, user_id, status) VALUES (NEW.id, NEW.user_id, NEW.status);
  END IF;
  NEW.updated_at := now();
  RETURN NEW;
END $$;
CREATE TRIGGER apps_status_ins AFTER INSERT ON public.applications FOR EACH ROW EXECUTE FUNCTION public.log_status();
CREATE OR REPLACE FUNCTION public.log_status_upd() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.status_records (application_id, user_id, status) VALUES (NEW.id, NEW.user_id, NEW.status);
  END IF;
  NEW.updated_at := now();
  RETURN NEW;
END $$;
CREATE TRIGGER apps_status_upd BEFORE UPDATE ON public.applications FOR EACH ROW EXECUTE FUNCTION public.log_status_upd();

CREATE TABLE public.documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  doc_type text NOT NULL DEFAULT 'other',
  status text NOT NULL DEFAULT 'not_started',
  link text NOT NULL DEFAULT '',
  notes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.documents TO authenticated;
GRANT ALL ON public.documents TO service_role;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own docs" ON public.documents FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "adviser reads docs" ON public.documents FOR SELECT TO authenticated USING (public.is_adviser_for(user_id));

CREATE TABLE public.application_documents (
  application_id uuid NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  document_id uuid NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  PRIMARY KEY (application_id, document_id)
);
GRANT SELECT, INSERT, DELETE ON public.application_documents TO authenticated;
GRANT ALL ON public.application_documents TO service_role;
ALTER TABLE public.application_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own links" ON public.application_documents FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "adviser reads links" ON public.application_documents FOR SELECT TO authenticated USING (public.is_adviser_for(user_id));

CREATE TABLE public.tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  application_id uuid REFERENCES public.applications(id) ON DELETE CASCADE,
  title text NOT NULL,
  due_date date,
  done boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tasks TO authenticated;
GRANT ALL ON public.tasks TO service_role;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own tasks" ON public.tasks FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "adviser reads tasks" ON public.tasks FOR SELECT TO authenticated USING (public.is_adviser_for(user_id));

CREATE TABLE public.notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  application_id uuid NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notes TO authenticated;
GRANT ALL ON public.notes TO service_role;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own notes" ON public.notes FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "adviser reads notes" ON public.notes FOR SELECT TO authenticated USING (public.is_adviser_for(user_id));

-- Fictional demo catalogue
INSERT INTO public.universities (id, name, country, city) VALUES
 ('00000000-0000-0000-0000-000000000a01','Northbridge University (fictional)','United Kingdom','Northbridge'),
 ('00000000-0000-0000-0000-000000000a02','Harbourline Institute of Technology (fictional)','Netherlands','Harbourline'),
 ('00000000-0000-0000-0000-000000000a03','Aldermere College London (fictional)','United Kingdom','London'),
 ('00000000-0000-0000-0000-000000000a04','Kestrel Bay University (fictional)','Australia','Kestrel Bay'),
 ('00000000-0000-0000-0000-000000000a05','Lumen Graduate School (fictional)','Canada','Vancouver');

INSERT INTO public.programmes (id, university_id, name, degree, duration_months, tuition, currency, intake, study_mode, min_gpa, english_test, references_required, portfolio_required, interview, application_fee, summary) VALUES
 ('00000000-0000-0000-0000-000000000b01','00000000-0000-0000-0000-000000000a01','Marketing Analytics','MSc',12,28500,'GBP','September 2027','Full-time',3.3,'IELTS 7.0 (6.5 each)',2,false,false,75,'Quantitative marketing, consumer data and campaign measurement.'),
 ('00000000-0000-0000-0000-000000000b02','00000000-0000-0000-0000-000000000a01','Digital Business Strategy','MA',12,26000,'GBP','September 2027','Full-time',3.0,'IELTS 6.5 (6.0 each)',2,false,true,75,'Platform strategy, digital transformation and innovation management.'),
 ('00000000-0000-0000-0000-000000000b03','00000000-0000-0000-0000-000000000a02','Data Science for Society','MSc',24,18900,'EUR','September 2027','Full-time',3.5,'TOEFL iBT 95',2,false,true,100,'Applied machine learning with public-interest research projects.'),
 ('00000000-0000-0000-0000-000000000b04','00000000-0000-0000-0000-000000000a03','Brand Management','MSc',12,31200,'GBP','January 2027','Full-time',3.2,'IELTS 7.0',1,true,false,0,'Brand building, creative strategy and a live client portfolio.'),
 ('00000000-0000-0000-0000-000000000b05','00000000-0000-0000-0000-000000000a04','International Business','Master',18,45000,'AUD','February 2027','Full-time',3.0,'IELTS 6.5',2,false,false,120,'Global trade, cross-cultural management and an industry placement.'),
 ('00000000-0000-0000-0000-000000000b06','00000000-0000-0000-0000-000000000a05','Management (Sustainability)','MSc',16,39000,'CAD','September 2027','Full-time or part-time',3.3,'IELTS 7.0 or Duolingo 120',3,false,true,150,'Responsible management with a sustainability consultancy capstone.');

INSERT INTO public.requirements (programme_id, label, detail, doc_type) VALUES
 ('00000000-0000-0000-0000-000000000b01','Academic transcript','Final or interim transcript','transcript'),
 ('00000000-0000-0000-0000-000000000b01','Personal statement','Max 1,000 words','statement'),
 ('00000000-0000-0000-0000-000000000b01','Two references','At least one academic','reference'),
 ('00000000-0000-0000-0000-000000000b01','CV','Up to 2 pages','cv'),
 ('00000000-0000-0000-0000-000000000b02','Academic transcript','','transcript'),
 ('00000000-0000-0000-0000-000000000b02','Personal statement','Max 800 words','statement'),
 ('00000000-0000-0000-0000-000000000b02','Two references','','reference'),
 ('00000000-0000-0000-0000-000000000b03','Academic transcript','Including course descriptions','transcript'),
 ('00000000-0000-0000-0000-000000000b03','Motivation letter','Max 2 pages','statement'),
 ('00000000-0000-0000-0000-000000000b03','English test result','TOEFL iBT 95','english'),
 ('00000000-0000-0000-0000-000000000b03','CV','','cv'),
 ('00000000-0000-0000-0000-000000000b04','Academic transcript','','transcript'),
 ('00000000-0000-0000-0000-000000000b04','Portfolio','3–5 brand or creative projects','portfolio'),
 ('00000000-0000-0000-0000-000000000b04','One reference','','reference'),
 ('00000000-0000-0000-0000-000000000b05','Academic transcript','','transcript'),
 ('00000000-0000-0000-0000-000000000b05','Personal statement','','statement'),
 ('00000000-0000-0000-0000-000000000b05','English test result','IELTS 6.5','english'),
 ('00000000-0000-0000-0000-000000000b06','Academic transcript','','transcript'),
 ('00000000-0000-0000-0000-000000000b06','Statement of purpose','Max 1,200 words','statement'),
 ('00000000-0000-0000-0000-000000000b06','Three references','','reference'),
 ('00000000-0000-0000-0000-000000000b06','CV','','cv');

INSERT INTO public.deadlines (programme_id, label, due_date) VALUES
 ('00000000-0000-0000-0000-000000000b01','Priority application round','2026-11-30'),
 ('00000000-0000-0000-0000-000000000b01','Final application deadline','2027-03-31'),
 ('00000000-0000-0000-0000-000000000b02','Application deadline','2027-02-28'),
 ('00000000-0000-0000-0000-000000000b03','Scholarship deadline','2026-12-01'),
 ('00000000-0000-0000-0000-000000000b03','Application deadline','2027-01-15'),
 ('00000000-0000-0000-0000-000000000b04','Application deadline','2026-11-15'),
 ('00000000-0000-0000-0000-000000000b05','Application deadline','2026-12-10'),
 ('00000000-0000-0000-0000-000000000b06','Round 1 deadline','2026-12-15'),
 ('00000000-0000-0000-0000-000000000b06','Round 2 deadline','2027-02-15');
