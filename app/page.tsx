// Etapa 1 — página de verificação de tokens (substituída pela Home na Etapa 4).
const cores = [
  ["ink", "#000000"], ["ink-80", "#333333"], ["ink-60", "#666666"], ["ink-40", "#999999"],
  ["ink-20", "#CCCCCC"], ["ink-10", "#E6E6E6"], ["ink-05", "#F2F2F2"], ["paper", "#FFFFFF"],
  ["brand", "#669933"], ["brand-deep", "#527F29"], ["brand-tint", "#E0EBD6"], ["brand-tint-soft", "#F0F5EB"],
];

export default function Page() {
  return (
    <main className="mx-auto flex max-w-site flex-col gap-12 px-4 py-16 md:px-6">
      <header className="flex flex-col gap-3">
        <p className="text-caption font-bold uppercase tracking-[0.12em] text-brand-deep">Etapa 1 · Setup</p>
        <h1 className="text-h3 md:text-display">Tokens da Black River</h1>
        <p className="max-w-[68ch] text-lead">Archivo (substituta da Bliss Pro), cantos retos e espaçamento de 4px.</p>
      </header>
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {cores.map(([nome, hex]) => (
          <div key={nome} className="flex flex-col gap-2">
            <div className="h-16 border border-ink-10" style={{ background: hex }} />
            <span className="text-small text-ink">{nome}</span>
            <span className="text-caption text-ink-60">{hex}</span>
          </div>
        ))}
      </section>
      <section className="flex flex-col gap-4">
        <p className="text-h1">h1 49px</p>
        <p className="text-h2">h2 39px</p>
        <p className="text-h3">h3 31px</p>
        <p className="text-h4">h4 25px</p>
        <p className="text-body">body 16px · <a className="text-brand-deep underline" href="#">link</a></p>
        <button className="w-fit bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-ink">Botão primário</button>
      </section>
    </main>
  );
}
