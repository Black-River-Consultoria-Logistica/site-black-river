import json
# Monta uma prévia de arquivo único do site exportado (out/) para mostrar ao Luis.
# Uso: npm run build && python3 scripts/montar-previa.py <destino.html>. Gera um HTML único com todas as páginas, para revisão fora do ar.
import base64, glob, os, re, sys, html as H
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "out")
DEST = sys.argv[1]
TIPOS = {".webp": "image/webp", ".png": "image/png", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".jpg": "image/jpeg"}
cache = {}
def data_uri(caminho):
    if caminho not in cache:
        arq = OUT + caminho
        ext = os.path.splitext(arq)[1]
        cache[caminho] = f"data:{TIPOS[ext]};base64," + base64.b64encode(open(arq, "rb").read()).decode()
    return cache[caminho]

rotas = re.findall(r"<loc>https://www\.blackriverconsultoria\.com\.br([^<]*)</loc>", open(OUT + "/sitemap.xml").read())
rotas = [r or "/" for r in rotas] + ["/obrigado"]
def token(r): return "inicio" if r == "/" else r.strip("/").replace("/", ".")
def arquivo(r): return OUT + ("/index.html" if r == "/" else r + ".html")

paginas = []
titulos = {}
for r in rotas:
    s = open(arquivo(r), encoding="utf-8").read()
    titulos[token(r)] = H.unescape(re.search(r"<title>(.*?)</title>", s).group(1))
    corpo = re.search(r"<body[^>]*>(.*)</body>", s, re.S).group(1)
    corpo = re.sub(r"<script\b.*?</script>", "", corpo, flags=re.S)
    corpo = re.sub(r"<link [^>]*>", "", corpo)
    corpo = re.sub(r"<next-route-announcer.*?</next-route-announcer>", "", corpo, flags=re.S)
    # links internos viram rotas da prévia (#token); âncoras da própria página ficam como estão
    def link(m):
        href = H.unescape(m.group(1))
        if href.startswith("/") and not href.startswith("//"):
            cam, _, ancora = href.partition("#")
            cam = cam.split("?")[0]
            if os.path.splitext(cam)[1] in (".txt", ".xml", ".png", ".webp"):
                return m.group(0)
            dest = f"#{token(cam or '/')}"
            extra = f' data-ancora="{ancora}"' if ancora else ""
            return f'href="{dest}"{extra}'
        return m.group(0)
    corpo = re.sub(r'href="#([^"]*)"', r'href="#\1" data-secao="\1"', corpo)
    corpo = re.sub(r'href="([^"]*)"', link, corpo)
    corpo = re.sub(r'src="(/[^"]+\.(?:webp|png|jpg|svg))"', lambda m: f'src="{data_uri(m.group(1))}"', corpo)
    corpo = re.sub(r'\s(?:srcSet|srcset|sizes)="[^"]*"', "", corpo)
    paginas.append(f'<template id="p-{token(r)}">{corpo}</template>')

classe_html = re.search(r'<html[^>]*class="([^"]*)"', open(OUT + "/index.html", encoding="utf-8").read()).group(1)
css = "".join(open(f, encoding="utf-8").read() for f in sorted(glob.glob(OUT + "/_next/static/css/*.css")))
css = re.sub(r"url\((/_next/static/media/[^)]+)\)", lambda m: f"url({data_uri(m.group(1))})", css)

menu_itens = [("Soluções", "solucoes"), ("Como trabalhamos", "como-trabalhamos"), ("Cases", "cases"), ("Insights", "insights"), ("Sobre", "sobre")]
doc = f"""<title>Prévia do site Black River</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>{css}
html,body{{background:#fff;color:#000}}
.previa-faixa{{background:#000;color:#ccc;font:500 13px/1.4 var(--font-sans,Arial),sans-serif;padding-block:8px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));display:flex;flex-wrap:wrap;gap:4px 16px;justify-content:space-between}}
.previa-faixa strong{{color:#669933;font-weight:700}}
.previa-menu{{position:fixed;inset:0;z-index:60;background:#fff;display:flex;flex-direction:column;gap:8px;padding:calc(env(safe-area-inset-top,0px) + 16px) max(16px,env(safe-area-inset-right,0px)) 24px max(16px,env(safe-area-inset-left,0px))}}
.previa-menu a{{font:600 20px/1.3 var(--font-sans,Arial),sans-serif;color:#000;text-decoration:none;padding:12px 0;border-bottom:1px solid #e6e6e6}}
.previa-menu .cta{{margin-top:16px;background:#527F29;color:#fff;text-align:center;border:0;padding:14px}}
.previa-menu button{{align-self:flex-end;font:600 15px var(--font-sans,Arial),sans-serif;background:none;border:0;padding:12px;cursor:pointer}}
.previa-aviso{{background:#E0EBD6;color:#000;padding:12px 16px;font-size:14px}}
</style>
<script>document.documentElement.classList.add({json.dumps(classe_html)}.split(" ").filter(Boolean)[0]); document.documentElement.lang = "pt-BR";</script>
<div class="previa-faixa"><span><strong>Prévia para revisão</strong> · site da Black River Consultoria · 14/10/2026</span><span>Textos em revisão. O formulário não envia nada nesta prévia.</span></div>
<div id="tela"></div>
<div id="menu-movel" class="previa-menu" hidden role="dialog" aria-label="Menu">
  <button type="button" id="fechar-menu">Fechar</button>
  {"".join(f'<a href="#{t}">{n}</a>' for n, t in menu_itens)}
  <a class="cta" href="#contato">Agendar conversa de diagnóstico</a>
</div>
{"".join(paginas)}
<script>
(function () {{
  var titulos = {json.dumps(titulos, ensure_ascii=False)};
  var tela = document.getElementById("tela"), menu = document.getElementById("menu-movel");
  function rota() {{ var h = location.hash.slice(1); return document.getElementById("p-" + h) ? h : "inicio"; }}
  function mostrar(ancora) {{
    var t = rota(), tpl = document.getElementById("p-" + t);
    tela.innerHTML = ""; tela.appendChild(tpl.content.cloneNode(true));
    document.title = titulos[t] || "Prévia do site Black River";
    menu.hidden = true;
    var alvo = ancora && document.getElementById(ancora);
    if (alvo) alvo.scrollIntoView(); else window.scrollTo(0, 0);
    ligar();
  }}
  function ligar() {{
    tela.querySelectorAll('[data-slot="sheet-trigger"]').forEach(function (b) {{ b.addEventListener("click", function () {{ menu.hidden = false; }}); }});
    var form = tela.querySelector("form");
    if (form) form.addEventListener("submit", function (e) {{
      e.preventDefault();
      var faltando = Array.prototype.filter.call(form.querySelectorAll("input[name]:not([name=site])"), function (i) {{ return !i.value.trim(); }});
      var aviso = form.querySelector(".previa-aviso");
      if (!aviso) {{ aviso = document.createElement("p"); aviso.className = "previa-aviso"; form.insertBefore(aviso, form.querySelector("button[type=submit]")); }}
      if (faltando.length) {{ aviso.textContent = "Na prévia, preencha os campos para ver a página seguinte. No site real, cada campo mostra a própria mensagem de erro."; faltando[0].focus(); return; }}
      location.hash = "obrigado";
    }});
    // caixa de autorização (no site real é um componente com JavaScript)
    tela.querySelectorAll('button[role="checkbox"]').forEach(function (c) {{
      c.addEventListener("click", function () {{ var on = c.getAttribute("aria-checked") !== "true"; c.setAttribute("aria-checked", on); c.setAttribute("data-state", on ? "checked" : "unchecked"); c.innerHTML = on ? "&#10003;" : ""; c.style.cssText = on ? "color:#fff;font-size:13px;line-height:1" : ""; }});
    }});
  }}
  document.getElementById("fechar-menu").addEventListener("click", function () {{ menu.hidden = true; }});
  document.addEventListener("click", function (e) {{
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var href = a.getAttribute("href");
    if (href.charAt(0) !== "#") return;
    var t = href.slice(1);
    if (a.hasAttribute("data-secao")) {{
      var sec = document.getElementById(a.getAttribute("data-secao"));
      if (sec) {{ e.preventDefault(); sec.scrollIntoView({{ behavior: "smooth" }}); }}
      return;
    }}
    if (document.getElementById("p-" + t)) {{
      e.preventDefault();
      if (location.hash === "#" + t) mostrar(a.getAttribute("data-ancora"));
      else {{ proxima = a.getAttribute("data-ancora"); location.hash = t; }}
    }} else {{
      var alvo = document.getElementById(t);
      if (alvo) {{ e.preventDefault(); alvo.scrollIntoView({{ behavior: "smooth" }}); }}
    }}
  }});
  var proxima = null;
  window.addEventListener("hashchange", function () {{ var a = proxima; proxima = null; mostrar(a); }});
  mostrar();
}})();
</script>
"""
open(DEST, "w", encoding="utf-8").write(doc)
print("rotas:", len(rotas), "tamanho:", round(len(doc) / 1024 / 1024, 2), "MB")
