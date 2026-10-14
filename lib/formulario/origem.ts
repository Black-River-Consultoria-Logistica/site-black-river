// Origem do pedido (Etapa 10): página onde a pessoa estava antes do formulário e UTMs da chegada ao site.
// Fica no sessionStorage (só esta aba, apagado ao fechar). Tudo em try/catch: em janela anônima ou com
// armazenamento bloqueado, o formulário funciona do mesmo jeito, só sem a origem.

const CHAVE_ANTERIOR = "br:pagina-anterior";
const CHAVE_UTMS = "br:utms";
const UTMS = ["utm_source", "utm_medium", "utm_campaign"] as const;
const ROTAS_DO_FORMULARIO = ["/contato", "/obrigado"];

type Utms = Partial<Record<(typeof UTMS)[number], string>>;

function ler(chave: string) {
  try {
    return window.sessionStorage.getItem(chave);
  } catch {
    return null;
  }
}

function gravar(chave: string, valor: string) {
  try {
    window.sessionStorage.setItem(chave, valor);
  } catch {
    // armazenamento indisponível: segue sem origem
  }
}

const ehFormulario = (rota: string) => ROTAS_DO_FORMULARIO.some((r) => rota.replace(/\/$/, "") === r);

/** Chamada a cada troca de página. */
export function guardarOrigem(atual: string, anterior: string | null) {
  // A última página de conteúdo antes do formulário (ignora idas e vindas entre /contato e /obrigado).
  if (anterior && !ehFormulario(anterior)) gravar(CHAVE_ANTERIOR, anterior);

  // UTMs: as da chegada valem até o fim da visita; um novo link com UTM substitui.
  const busca = new URLSearchParams(window.location.search);
  const utms: Utms = {};
  for (const u of UTMS) {
    const v = busca.get(u)?.trim();
    if (v) utms[u] = v.slice(0, 120);
  }
  if (Object.keys(utms).length) gravar(CHAVE_UTMS, JSON.stringify(utms));
}

/** Lida no envio do formulário. */
export function lerOrigem(): { pagina_origem?: string } & Utms {
  let pagina = ler(CHAVE_ANTERIOR) ?? undefined;

  // Chegou direto no /contato (link externo, LinkedIn, e-mail): usa o site de onde veio.
  if (!pagina && document.referrer) {
    try {
      const ref = new URL(document.referrer);
      pagina = ref.host === window.location.host ? ref.pathname : ref.host + ref.pathname;
    } catch {
      // referrer inválido: sem origem
    }
  }

  let utms: Utms = {};
  try {
    utms = JSON.parse(ler(CHAVE_UTMS) ?? "{}") as Utms;
  } catch {
    utms = {};
  }
  return { pagina_origem: pagina?.slice(0, 300), ...utms };
}
