-- Conferência da Etapa 9: rodar no SQL Editor depois dos dois scripts de supabase/migrations.
-- Cada linha mostra o resultado encontrado e o esperado; a coluna "ok" deve ser true em todas.
select verificacao, resultado, esperado, resultado = esperado as ok
from (
  values
    ('Visitante (anon) consegue ler os pedidos',            has_table_privilege('anon', 'public.leads', 'select'),           false),
    ('Visitante (anon) consegue gravar pedidos',            has_table_privilege('anon', 'public.leads', 'insert'),           false),
    ('Usuário logado consegue ler os pedidos',              has_table_privilege('authenticated', 'public.leads', 'select'),  false),
    ('Função do formulário (service_role) consegue gravar', has_table_privilege('service_role', 'public.leads', 'insert'),   true),
    ('RLS ligado na tabela de pedidos',                     (select relrowsecurity from pg_class where oid = 'public.leads'::regclass), true),
    ('Regra "Visitantes não leem nem gravam" existe',       exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'leads' and policyname = 'Visitantes não leem nem gravam'), true),
    ('Visitante executa rls_auto_enable()',                 coalesce(has_function_privilege('anon', to_regprocedure('public.rls_auto_enable()'), 'execute'), false), false),
    ('Visitante executa ping() (sinal diário)',             has_function_privilege('anon', 'public.ping()', 'execute'),      true),
    ('Rotina de exclusão de 12 meses agendada',             exists (select 1 from cron.job where jobname = 'leads-retencao-12-meses'), true)
) as t(verificacao, resultado, esperado);
