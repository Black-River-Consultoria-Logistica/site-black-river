// Dados estruturados (JSON-LD) renderizados no HTML do servidor (Etapa 12).
// O "<" é escapado para o conteúdo nunca fechar a tag <script> antes da hora.
export function JsonLd({ dados }: { dados: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, "\\u003c") }}
    />
  );
}
