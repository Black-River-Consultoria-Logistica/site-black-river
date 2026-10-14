# Roteiro da reunião de briefing

> Versão oficial do roteiro. Fica no repositório para que qualquer pessoa ou agente (Claude, Cursor, Codex, em qualquer conta) tenha acesso. A ficha 7 da biblioteca aponta para cá.
> Duração: 60 minutos. Cada pergunta indica a seção do `BRIEF.md` que ela alimenta.

## Antes da reunião

- [ ] Diagnóstico do site atual pronto (ou anotado que não há site).
- [ ] `docs/CONCORRENTES.md` preenchido, com 2 ou 3 lacunas candidatas a diferencial.
- [ ] Pacote provável identificado na qualificação.
- [ ] Gravador com transcrição pronto.

## Abertura (5 min)

1. Ler o aviso de gravação e pedir consentimento. Sem consentimento, anotar à mão.
2. Explicar o objetivo: sair da reunião com tudo o que é preciso para a proposta.

## Diagnóstico e concorrentes (15 min)

3. Apresentar os 3 a 5 problemas do site atual.
4. Mostrar a matriz de concorrentes: o que é padrão do mercado e as lacunas.
5. Validar a lacuna escolhida: "Vocês conseguem provar isso? Com qual número, case ou garantia?" → **Posicionamento**

## As 12 perguntas (35 min)

| # | Pergunta | Alimenta no BRIEF.md |
| --- | --- | --- |
| 1 | O que a empresa vende e qual é o diferencial em relação aos concorrentes? | Contexto, Posicionamento |
| 2 | Qual é a única ação que o visitante deve tomar no site? | Objetivo (CTA único) |
| 3 | Como saberemos, em 90 dias, que o site funcionou? (leads, vendas, agendamentos) | Objetivo (métrica) |
| 4 | Quem é o visitante ideal? Cargo, setor, porte, momento de compra. | Público |
| 5 | Quais dúvidas ou objeções ele tem antes de comprar? Quais perguntas ele faz no WhatsApp ou por telefone? | Público (objeções e perguntas reais para AEO/GEO) |
| 6 | Que provas temos? Clientes, números, depoimentos, certificações. | Mensagem (provas) |
| 7 | Como a marca fala? Três adjetivos e um exemplo de texto que a represente bem. | Mensagem (tom de voz) |
| 8 | Quais sites admira e quais detesta, e por quê? (pedir 3 e 1) | Referências |
| 9 | O que já existe? Logo, cores, fontes, fotos, textos, domínio. | Restrições, Decisões técnicas |
| 10 | Quais páginas e integrações são obrigatórias (CRM, WhatsApp, agenda, pagamento)? | Escopo |
| 11 | Qual é o prazo, o orçamento e quem aprova as entregas? | Restrições, Aprovação |
| 12 | O que está fora do escopo? | Escopo |

## Complementares (5 min, ou por e-mail depois)

- Dados da empresa exatamente como devem aparecer em todos os canais: nome fantasia, razão social, CNPJ, endereço, telefone, e-mail, área de atendimento, redes sociais. → **Entidade**
- Política para robôs de IA: padrão sugerido é liberar robôs de busca e bloquear os de treino. → **Decisões técnicas**
- Quem cria as contas no nome da empresa (domínio, Cloudflare, GA4, Search Console). → **Decisões técnicas**
- Regras do setor ou exigências legais além da LGPD. → **Restrições**

## Encerramento (5 min)

- Explicar o processo em 4 marcos (brief, layout, aprovação para publicação, entrega).
- Avisar que o site não tem painel de edição: alterações são feitas pelo plano de manutenção.
- Combinar a data de envio da proposta (até 48 horas).

## Depois da reunião

1. Gerar o `BRIEF.md` com o prompt "Brief a partir da reunião" (`docs/PROMPTS.md`).
2. Rodar o prompt "Conferir briefing" para listar o que o roteiro pedia e a reunião não cobriu.
3. Mandar ao cliente as perguntas pendentes em uma única mensagem.

## Conferência rápida

Um brief só está pronto para construir quando estes itens não estão `[A CONFIRMAR]`:

- [ ] CTA único (pergunta 2)
- [ ] Métrica de 90 dias (pergunta 3)
- [ ] Visitante ideal (pergunta 4)
- [ ] Lacuna escolhida e prova (abertura, item 5)
- [ ] Páginas do escopo (pergunta 10)
- [ ] Responsável pelo aceite (pergunta 11)
