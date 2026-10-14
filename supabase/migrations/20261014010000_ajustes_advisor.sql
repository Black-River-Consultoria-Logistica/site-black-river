-- Etapa 9 — Ajustes pedidos pelo Security Advisor do Supabase (14/10/2026), depois do primeiro script.
-- Rodar uma vez no SQL Editor. Pode rodar de novo sem efeito colateral.

-- 1. "Public / Signed-In Users Can Execute SECURITY DEFINER Function public.rls_auto_enable()"
--    A função é criada pelo próprio Supabase quando o projeto nasce com "Enable automatic RLS".
--    Ela roda como gatilho de eventos (event trigger), que não depende desta permissão:
--    tirar o EXECUTE dos papéis públicos não desliga o RLS automático.
do $$
begin
  if to_regprocedure('public.rls_auto_enable()') is not null then
    revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
  end if;
end
$$;

-- 2. "RLS Enabled No Policy" em public.leads
--    O desenho aprovado é RLS sem nenhuma política para visitantes. Esta política restritiva
--    deixa isso explícito no banco (nega tudo a anon e authenticated); a service role,
--    usada só na Função da Cloudflare, continua ignorando o RLS.
drop policy if exists "Visitantes não leem nem gravam" on public.leads;
create policy "Visitantes não leem nem gravam"
  on public.leads
  as restrictive
  for all
  to anon, authenticated
  using (false)
  with check (false);

-- 3. "Unused Index" (2x) em public.leads
--    Com dezenas de pedidos por mês, os índices não fazem diferença. Removidos para simplificar.
drop index if exists public.leads_criado_em_idx;
drop index if exists public.leads_status_idx;
