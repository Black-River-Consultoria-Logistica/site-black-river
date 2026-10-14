"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { CircleAlert } from "lucide-react";
import { linkInline } from "@/components/site/blocos";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { contato } from "@/lib/content/contato";
import { camposVisiveis, errosPorCampo, type CampoVisivel } from "@/lib/formulario/esquema";
import { lerOrigem } from "@/lib/formulario/origem";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

// Formulário de agendamento (Etapa 10). Regras: lib/formulario/esquema.ts (as mesmas da Função da Cloudflare).
// APP_FLOW: erro por campo sem perder o que foi digitado · botão desabilitado durante o envio ·
// falha com "tentar de novo" e canais alternativos · sucesso leva a /obrigado.

type Turnstile = {
  render: (alvo: HTMLElement, opcoes: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

type Valores = { nome: string; email: string; empresa: string; cargo: string; telefone: string; consentimento: boolean };
type Erros = Partial<Record<CampoVisivel, string>>;
type Estado = "editando" | "enviando" | "falha";

const ORDEM: CampoVisivel[] = ["nome", "email", "empresa", "cargo", "telefone", "consentimento"];
const idDoCampo = (campo: string) => `campo-${campo}`;
const idDoErro = (campo: string) => `erro-${campo}`;

function chaveDoTurnstile() {
  const configurada = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (configurada) return configurada;
  const host = window.location.hostname;
  const oficial = host === site.turnstile.dominio || host.endsWith(`.${site.turnstile.dominio}`);
  return oficial ? site.turnstile.chaveDoSite : site.turnstile.chaveDeTeste;
}

function validar(valores: Valores): Erros {
  const resultado = camposVisiveis.safeParse(valores);
  return resultado.success ? {} : errosPorCampo(resultado);
}

function focarPrimeiroErro(erros: Erros) {
  const primeiro = ORDEM.find((c) => erros[c]);
  if (primeiro) document.getElementById(idDoCampo(primeiro))?.focus();
}

export function FormularioDeAgendamento() {
  const router = useRouter();
  const [valores, setValores] = useState<Valores>({
    nome: "",
    email: "",
    empresa: "",
    cargo: "",
    telefone: "",
    consentimento: false,
  });
  const [erros, setErros] = useState<Erros>({});
  const [tentouEnviar, setTentouEnviar] = useState(false);
  const [estado, setEstado] = useState<Estado>("editando");

  const formulario = useRef<HTMLFormElement>(null);
  const armadilha = useRef<HTMLInputElement>(null);
  const avisoDeFalha = useRef<HTMLDivElement>(null);
  const caixaDoTurnstile = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const token = useRef<string | null>(null);

  // Turnstile no modo "só quando precisar": invisível para quase todo mundo; aparece acima do botão
  // apenas se a Cloudflare pedir uma confirmação.
  const montarTurnstile = useCallback(() => {
    if (!window.turnstile || !caixaDoTurnstile.current || widget.current) return;
    widget.current = window.turnstile.render(caixaDoTurnstile.current, {
      sitekey: chaveDoTurnstile(),
      action: "agendamento",
      appearance: "interaction-only",
      language: "pt-br",
      callback: (t: string) => {
        token.current = t;
      },
      "expired-callback": () => {
        token.current = null;
      },
      "error-callback": () => {
        token.current = null;
      },
    });
  }, []);

  useEffect(() => {
    montarTurnstile();
    return () => {
      if (widget.current && window.turnstile) window.turnstile.remove(widget.current);
      widget.current = null;
    };
  }, [montarTurnstile]);

  // O token vale para um envio só: depois de qualquer falha, a Cloudflare emite outro.
  function renovarTurnstile() {
    token.current = null;
    if (widget.current && window.turnstile) window.turnstile.reset(widget.current);
  }

  // O token costuma chegar segundos depois de a página abrir; se a pessoa for rápida, espera um pouco.
  async function esperarToken(limiteMs = 15000) {
    const inicio = Date.now();
    while (!token.current && Date.now() - inicio < limiteMs) {
      await new Promise((r) => setTimeout(r, 200));
    }
    return token.current;
  }

  function alterar<C extends keyof Valores>(campo: C, valor: Valores[C]) {
    const novos = { ...valores, [campo]: valor };
    setValores(novos);
    // Depois da primeira tentativa, o erro some (ou muda) enquanto a pessoa corrige.
    if (tentouEnviar) setErros(validar(novos));
  }

  async function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (estado === "enviando") return;
    setTentouEnviar(true);

    const errosDaTela = validar(valores);
    setErros(errosDaTela);
    if (Object.keys(errosDaTela).length) {
      setEstado("editando");
      focarPrimeiroErro(errosDaTela);
      return;
    }

    setEstado("enviando");
    try {
      const turnstile = await esperarToken();
      const modulo = new URLSearchParams(window.location.search).get("modulo") ?? undefined;
      const resposta = await fetch("/api/agendamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...valores,
          modulo_interesse: modulo,
          ...lerOrigem(),
          site: armadilha.current?.value ?? "",
          turnstile: turnstile ?? undefined,
        }),
      });
      const dados = (await resposta.json().catch(() => ({}))) as { ok?: boolean; campos?: Erros };

      if (resposta.ok && dados.ok) {
        router.push("/obrigado");
        return; // o botão continua em "Enviando..." até a troca de página
      }
      if (resposta.status === 422 && dados.campos && Object.keys(dados.campos).length) {
        renovarTurnstile();
        setErros(dados.campos);
        setEstado("editando");
        focarPrimeiroErro(dados.campos);
        return;
      }
      throw new Error(`envio recusado (${resposta.status})`);
    } catch {
      renovarTurnstile();
      setEstado("falha");
      // Leva o foco ao aviso para quem usa leitor de tela ou está com o botão fora da vista.
      requestAnimationFrame(() => avisoDeFalha.current?.focus());
    }
  }

  const enviando = estado === "enviando";
  const temAlternativa = Boolean(site.contato.email || site.contato.whatsapp);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={montarTurnstile}
      />
      <form ref={formulario} noValidate onSubmit={enviar} aria-describedby="formulario-obrigatorios" className="flex flex-col gap-6">
        <p id="formulario-obrigatorios" className="sr-only">
          Todos os campos são obrigatórios.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <Campo campo="nome" erro={erros.nome}>
            <Input
              id={idDoCampo("nome")}
              name="nome"
              autoComplete="name"
              maxLength={120}
              value={valores.nome}
              onChange={(e) => alterar("nome", e.target.value)}
              {...atributosDeErro("nome", erros.nome)}
            />
          </Campo>
          <Campo campo="email" erro={erros.email}>
            <Input
              id={idDoCampo("email")}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              maxLength={254}
              value={valores.email}
              onChange={(e) => alterar("email", e.target.value)}
              {...atributosDeErro("email", erros.email)}
            />
          </Campo>
          <Campo campo="empresa" erro={erros.empresa}>
            <Input
              id={idDoCampo("empresa")}
              name="empresa"
              autoComplete="organization"
              maxLength={160}
              value={valores.empresa}
              onChange={(e) => alterar("empresa", e.target.value)}
              {...atributosDeErro("empresa", erros.empresa)}
            />
          </Campo>
          <Campo campo="cargo" erro={erros.cargo}>
            <Input
              id={idDoCampo("cargo")}
              name="cargo"
              autoComplete="organization-title"
              maxLength={120}
              value={valores.cargo}
              onChange={(e) => alterar("cargo", e.target.value)}
              {...atributosDeErro("cargo", erros.cargo)}
            />
          </Campo>
          <Campo campo="telefone" erro={erros.telefone}>
            <Input
              id={idDoCampo("telefone")}
              name="telefone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={20}
              placeholder="(11) 99999-9999"
              value={valores.telefone}
              onChange={(e) => alterar("telefone", e.target.value)}
              {...atributosDeErro("telefone", erros.telefone)}
            />
          </Campo>
        </div>

        {/* Armadilha para robôs: fora da tela e fora da ordem de tabulação; pessoas não veem nem preenchem. */}
        <div aria-hidden className="absolute -left-[10000px] size-px overflow-hidden">
          <label htmlFor="campo-site">Não preencha este campo</label>
          <input ref={armadilha} id="campo-site" name="site" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-3">
            <Checkbox
              id={idDoCampo("consentimento")}
              name="consentimento"
              checked={valores.consentimento}
              onCheckedChange={(v) => alterar("consentimento", v === true)}
              className="mt-0.5"
              {...atributosDeErro("consentimento", erros.consentimento)}
            />
            <label htmlFor={idDoCampo("consentimento")} className="text-small text-ink-80">
              {contato.consentimento.antes}
              <Link href="/privacidade" className={linkInline}>
                {contato.consentimento.link}
              </Link>
              {contato.consentimento.depois}
            </label>
          </div>
          <MensagemDeErro campo="consentimento" erro={erros.consentimento} />
        </div>

        {/* Turnstile: vazio na maioria das visitas. */}
        <div ref={caixaDoTurnstile} className="empty:hidden" />

        {estado === "falha" && (
          <div
            ref={avisoDeFalha}
            role="alert"
            tabIndex={-1}
            className="flex gap-3 border-l-2 border-destructive bg-ink-05 p-4 text-small text-ink outline-none"
          >
            <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-destructive" />
            <div className="flex flex-col gap-2">
              <p>
                {contato.falha.inicio}
                {temAlternativa ? contato.falha.alternativa : "."}
              </p>
              {temAlternativa && <CanaisDiretos />}
              <Button type="button" variant="link" className="self-start" onClick={() => formulario.current?.requestSubmit()}>
                {contato.falha.tentarDeNovo}
              </Button>
            </div>
          </div>
        )}

        <Button type="submit" disabled={enviando} aria-disabled={enviando} className="w-full sm:w-auto sm:self-start">
          {enviando ? contato.botaoEnviando : contato.botao}
        </Button>
        <p aria-live="polite" className="sr-only">
          {enviando ? contato.botaoEnviando : ""}
        </p>
      </form>
    </>
  );
}

function atributosDeErro(campo: CampoVisivel, erro?: string) {
  return {
    "aria-invalid": erro ? true : undefined,
    "aria-describedby": erro ? idDoErro(campo) : undefined,
    "aria-required": true,
  } as const;
}

function Campo({ campo, erro, children }: { campo: Exclude<CampoVisivel, "consentimento">; erro?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={idDoCampo(campo)}>{contato.rotulos[campo]}</Label>
      {children}
      <MensagemDeErro campo={campo} erro={erro} />
    </div>
  );
}

function MensagemDeErro({ campo, erro }: { campo: CampoVisivel; erro?: string }) {
  if (!erro) return null;
  return (
    <p id={idDoErro(campo)} className="flex items-start gap-2 text-small text-destructive">
      <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
      {erro}
    </p>
  );
}

/** E-mail e WhatsApp institucionais. Só aparecem quando configurados em lib/site.ts (pendência #3). */
export function CanaisDiretos({ className }: { className?: string }) {
  const { email, whatsapp, whatsappExibicao } = site.contato;
  if (!email && !whatsapp) return null;
  return (
    <ul className={cn("flex flex-col gap-1", className)}>
      {email && (
        <li>
          <a href={`mailto:${email}`} className={linkInline}>
            {email}
          </a>
        </li>
      )}
      {whatsapp && (
        <li>
          <a href={`https://wa.me/${whatsapp}`} className={linkInline} target="_blank" rel="noopener noreferrer">
            WhatsApp {whatsappExibicao ?? ""}
          </a>
        </li>
      )}
    </ul>
  );
}
