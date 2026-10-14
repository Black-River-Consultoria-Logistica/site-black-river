# App Flow — [Nome do cliente]

> Gerado a partir do BRIEF.md. Todo item do checklist de produção que tem página ou estado (404, carregando, erro, obrigado, cookies, páginas legais) precisa aparecer aqui.

## Páginas

| Rota | Página | Palavra-chave principal |
| --- | --- | --- |
| / | Home | [ ] |
| /obrigado | Obrigado | — |
| /privacidade | Política de privacidade | — |
| /termos | Termos de uso | — |
| (qualquer rota inexistente) | 404 | — |

## Fluxo (modelo: landing page de leads)

```mermaid
flowchart TD
    A[Visitante chega à Home] --> B{Primeira visita?}
    B -- Sim --> C[Banner de cookies]
    C --> D[Hero com CTA]
    B -- Não --> D
    D -->|Clica no CTA| E[Formulário de contato]
    E -->|Envia| F{Campos válidos?}
    F -- Não --> G[Erros por campo, dados mantidos]
    G --> E
    F -- Sim --> H[Estado de carregamento]
    H --> I{Envio OK?}
    I -- Sim --> J[Página de obrigado + evento no GA4]
    I -- Não --> K[Mensagem de falha + tentar de novo]
    K --> E
    D -->|Rodapé| L[Política de privacidade]
    D -->|Rodapé| M[Termos de uso]
    N[URL inexistente] --> O[Página 404 com volta à Home]
```
