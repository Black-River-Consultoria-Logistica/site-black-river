-- Etapa 9 — Banco de dados (docs/SCHEMA.md, aprovado em 13/10/2026; ajustes do plano Free em 14/10/2026).
-- Projeto Supabase da Black River, região São Paulo (sa-east-1), plano Free.
-- Rodar uma vez, no SQL Editor do Supabase ou com `supabase db push`.

-- ---------------------------------------------------------------------------
-- Tabela de pedidos de conversa de diagnóstico (formulário de /contato)
-- ---------------------------------------------------------------------------
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  nome text not null check (char_length(nome) between 2 and 120),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  empresa text not null check (char_length(empresa) between 2 and 160),
  cargo text not null check (char_length(cargo) between 2 and 120),
  telefone text check (telefone is null or char_length(telefone) <= 20),
  preferencia_formato text check (preferencia_formato in ('online','presencial','tanto_faz')),
  modulo_interesse text check (modulo_interesse in (
    'diagnostico','projeto_cd','eficiencia_cd','abastecimento_estoques',
    'verbas_logisticas','tecnologia','transporte_malha','nao_sei')),
  mensagem text check (mensagem is null or char_length(mensagem) <= 1000),
  pagina_origem text check (pagina_origem is null or char_length(pagina_origem) <= 300),
  utm_source text check (utm_source is null or char_length(utm_source) <= 120),
  utm_medium text check (utm_medium is null or char_length(utm_medium) <= 120),
  utm_campaign text check (utm_campaign is null or char_length(utm_campaign) <= 120),
  consentimento_lgpd boolean not null check (consentimento_lgpd = true),
  versao_politica text not null,
  status text not null default 'novo'
    check (status in ('novo','contatado','agendado','realizado','descartado')),
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

comment on table public.leads is
  'Pedidos de conversa de diagnóstico do site. Dados pessoais (LGPD): só a Função da Cloudflare grava (service role); leitura pelo painel.';

-- RLS ativo e NENHUMA política: visitantes (anon) e usuários logados (authenticated)
-- não leem nem gravam. A service role, usada só na Função da Cloudflare, ignora RLS.
alter table public.leads enable row level security;

-- Projeto criado com "Automatically expose new tables" DESMARCADO (14/10/2026): nenhuma tabela nova
-- ganha privilégios sozinha. Por isso os privilégios são dados aqui, um a um.
-- Visitantes e usuários logados: nada (defesa em profundidade, além do RLS sem políticas).
revoke all on table public.leads from anon, authenticated;
-- Função da Cloudflare (service role): grava; o painel lê e atualiza o status.
grant select, insert, update, delete on table public.leads to service_role;

create index leads_criado_em_idx on public.leads (criado_em);
create index leads_status_idx on public.leads (status);

-- Atualiza atualizado_em quando o status muda no painel.
-- search_path vazio: evita o alerta "function_search_path_mutable" do Security Advisor.
create or replace function public.tocar_atualizado_em()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.atualizado_em := now();
  return new;
end
$$;

create trigger leads_atualizado_em
  before update on public.leads
  for each row execute function public.tocar_atualizado_em();

-- ---------------------------------------------------------------------------
-- Sinal de atividade (plano Free pausa o projeto após 7 dias de pouca atividade)
-- ---------------------------------------------------------------------------
-- Uma tarefa agendada na Cloudflare (workers/manter-ativo) chama esta função todo dia
-- com a chave anônima. Ela não lê nem expõe dados: só devolve 1.
create or replace function public.ping()
returns integer
language sql
stable
set search_path = ''
as $$ select 1 $$;

revoke all on function public.ping() from public;
grant execute on function public.ping() to anon;

-- ---------------------------------------------------------------------------
-- Retenção LGPD: excluir pedidos sem avanço comercial após 12 meses
-- ---------------------------------------------------------------------------
-- pg_cron: se este comando falhar, ativar em Integrations › Cron no painel e rodar de novo.
create extension if not exists pg_cron;

select cron.schedule(
  'leads-retencao-12-meses',
  '0 6 * * 1', -- segundas, 6h UTC (3h em Brasília)
  $$ delete from public.leads
     where status in ('novo','contatado','descartado')
       and atualizado_em < now() - interval '12 months' $$
);
