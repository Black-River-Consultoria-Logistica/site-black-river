# Checklist de segurança (19 itens)

Rodar antes de publicar e sempre que mexer em login, banco ou formulários. Itens "login" ou "banco" só se aplicam se o site tiver essas partes.

> A auditoria feita pela IA que escreveu o código tende a ser otimista: o item 19 deve ser feito por uma pessoa. Chave exposta deve ser revogada no painel do fornecedor imediatamente.

| # | Item | Quando se aplica | Critério de pronto |
| --- | --- | --- | --- |
| 1 | Proteger as chaves de API | Sempre que usar APIs | Chaves só no servidor, em variáveis de ambiente; nada sensível com `NEXT_PUBLIC_` |
| 2 | Nunca expor o `.env` | Sempre | `.env` no `.gitignore` e inacessível pela URL |
| 3 | Nenhum segredo no código | Sempre | Busca por "key", "secret", "password", "token" não encontra valores reais |
| 4 | Login de verdade | Login | Provedor pronto (Supabase Auth, Clerk); nunca senha comparada no navegador |
| 5 | Permissões no servidor | Login | Cada rota de API verifica quem está logado e se pode agir |
| 6 | Usuário não vê dados de outro | Login + banco | Trocar o ID na URL ou requisição não mostra registro alheio |
| 7 | Travar permissões do banco | Banco | RLS ativo em todas as tabelas conforme SCHEMA.md; Security Advisor do Supabase sem alertas |
| 8 | Regras de Firebase, Storage e Supabase | Banco ou arquivos | Nenhuma regra aberta a todos; buckets privados por padrão |
| 9 | Proteger páginas de admin | Painel | /admin exige login e papel de administrador, checados no servidor |
| 10 | Modo debug desligado | Sempre | Ferramentas de desenvolvimento desativadas em produção |
| 11 | Sem erro detalhado | Sempre | Visitante vê mensagem genérica; detalhes só nos logs |
| 12 | Validar tudo no servidor | Formulários | Todo dado recebido validado no servidor (ex.: Zod) |
| 13 | Limpar conteúdo do usuário | Conteúdo exibido | Nada renderizado como HTML sem sanitização (XSS) |
| 14 | Proteger upload | Upload | Tipo e tamanho limitados no servidor; bucket privado |
| 15 | Evitar injeção de SQL | Banco | Só consultas parametrizadas ou ORM |
| 16 | Limite de tentativas | Login e formulários | Rate limit por IP ou e-mail; proteção contra robôs |
| 17 | Histórico do Git sem segredos | Sempre | Gitleaks sem achados; chave vazada é trocada, não só apagada |
| 18 | Headers de segurança e CORS | Sempre | Nota A em securityheaders.com; CORS só para o próprio domínio |
| 19 | Testar como um estranho | Sempre | Em janela anônima e com outra conta, tentar acessar admin, dados alheios e rotas de API |
