// Função da Cloudflare Pages: POST /api/agendamento (Etapa 10).
// Toda a regra fica em lib/formulario/processar.ts (testável sem a Cloudflare); aqui só o envelope HTTP.
// Variáveis de ambiente (painel da Cloudflare, nunca no código): ver docs/SCHEMA.md.
// Limite de envios por IP: regra de rate limiting no painel da Cloudflare (WAF), configurada na Etapa 13.

import { processarPedido, type Ambiente } from "../../lib/formulario/processar";

type Contexto = { request: Request; env: Ambiente };

const LIMITE_DO_CORPO = 16 * 1024; // 16 KB: o formulário inteiro cabe com folga

function json(status: number, corpo: unknown) {
  return new Response(JSON.stringify(corpo), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export async function onRequestPost({ request, env }: Contexto) {
  const tamanho = Number(request.headers.get("Content-Length") ?? "0");
  if (tamanho > LIMITE_DO_CORPO) return json(413, { ok: false, erro: "envio" });

  let corpo: unknown;
  try {
    const texto = await request.text();
    if (texto.length > LIMITE_DO_CORPO) return json(413, { ok: false, erro: "envio" });
    corpo = JSON.parse(texto);
  } catch {
    return json(400, { ok: false, erro: "envio" });
  }

  const resposta = await processarPedido(corpo, env, {
    fetch,
    ip: request.headers.get("CF-Connecting-IP"),
    origem: request.headers.get("Origin"),
    log: (msg) => console.log(`[agendamento] ${msg}`),
  });
  return json(resposta.status, resposta.corpo);
}

// Qualquer outro método: 405.
export async function onRequest() {
  return json(405, { ok: false, erro: "metodo" });
}
