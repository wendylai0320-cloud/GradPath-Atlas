
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.log_status() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.log_status_upd() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_adviser_for(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_adviser_for(uuid) TO authenticated;
