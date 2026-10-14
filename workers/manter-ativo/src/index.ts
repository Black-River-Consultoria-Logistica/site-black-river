// Worker "manter-ativo" (Etapa 9): chama a função public.ping() do Supabase uma vez por dia.
// Usa só a chave anônima (pública por natureza) e uma função que devolve 1: não lê nem expõe dados.
// Ver docs/SCHEMA.md › "Plano Free: pausa e backup".

type Env = { SUPABASE_URL: string; SUPABASE_ANON_KEY: string };
type Contexto = { waitUntil(promessa: Promise<unknown>): void };

async function sinal(env: Env) {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    console.error("manter-ativo: SUPABASE_URL ou SUPABASE_ANON_KEY não configurados");
    return;
  }
  const resposta = await fetch(`${env.SUPABASE_URL}/rest/v1/rpc/ping`, {
    method: "POST",
    headers: {
      apikey: env.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
    },
    body: "{}",
  });
  // Falha aparece nos logs da Cloudflare (Workers › black-river-manter-ativo › Logs).
  if (!resposta.ok) console.error(`manter-ativo: Supabase respondeu ${resposta.status}`);
}

const worker = {
  async scheduled(_evento: unknown, env: Env, ctx: Contexto) {
    ctx.waitUntil(sinal(env));
  },
};

export default worker;
