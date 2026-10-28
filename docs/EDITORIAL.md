# Conteúdo e revisão editorial

As páginas internas foram desenvolvidas sobre a estrutura existente. A página
inicial foi preservada. Dados ainda não confirmados aparecem em notas editoriais;
nenhum canal pendente é apresentado como link funcional.

## Artigos locais

Cada artigo fica em `src/content/articles/`, em um arquivo TypeScript. Os tipos
estão em `src/content/article-types.ts`; o registro dos artigos está em
`src/lib/articles.ts`. Não é necessário CMS, banco de dados, MDX ou API.

Campos comuns:

- `slug`: identificador único da URL, sem espaços, acentos ou barras.
- `title` e `summary`: título e resumo exibidos na listagem e no artigo.
- `category`: uma chave de `articleCategories`.
- `createdAt`: data real de criação editorial, no formato `AAAA-MM-DD`.
- `sections`: seções com `id` único, `title`, `paragraphs` e, opcionalmente, `list`.
- `references`: opcional; somente fontes verificadas, com título e URL HTTPS.

Um rascunho usa `status: "draft"` e `editorialNotes`, sem `publishedAt`.
O modelo exibe aviso de revisão pendente e data de criação, sem atribuir
aprovação profissional ou publicação definitiva. As rotas de rascunhos recebem
`noindex, nofollow`. Essa indicação para buscadores não restringe acesso:
os rascunhos fazem parte da versão estática de revisão.

Para adicionar um artigo, crie o arquivo, importe-o e acrescente-o ao registro
em `src/lib/articles.ts`. A listagem e `generateStaticParams` utilizam esse
registro para gerar `/conteudos/<slug>/index.html` durante o build. Links
internos, datas e categorias são apresentados pelos componentes existentes.

Antes de publicar um artigo:

1. Revisar conteúdo, precisão conceitual, linguagem, limites e referências.
2. Confirmar autoria e aprovação profissional com Eduardo Villela Tumani.
3. Alterar o status para `published`, retirar `editorialNotes` e informar uma
   data real em `publishedAt`. O tipo exige a data para artigos publicados.
4. Executar lint, build e testes; atualizar os cenários de teste caso altere
   o conjunto editorial aprovado.
5. Revisar a exportação e aprovar a publicação da versão do site.

Para retirar um rascunho da exportação, remova-o do registro de artigos antes
do build. Os dois exemplos atuais são rascunhos, sem referências demonstrativas
ou artigos finais aprovados.

## Canais de contato

Os campos ficam em `src/lib/contact.ts`. Permanecem `null` até confirmação:
canal principal, WhatsApp, e-mail e modalidade de atendimento.

O canal principal exige rótulo e URL HTTPS. O WhatsApp exige formato
internacional com `+`, código do país e número, sem espaços ou pontuação.
O link utiliza somente o número e não inclui mensagem clínica pré-preenchida.
O e-mail é convertido em link `mailto:` apenas quando preenchido.

Preencher um canal altera o funcionamento descrito na Política de Privacidade.
Revisar a política e os testes junto com essa alteração. Não há formulário nem
coleta de informações clínicas implementados no site.

## Informações que precisam de confirmação

- Denominação oficial dos cursos e instituições já informados no README e
  situação atual da formação em Neurociências.
- Fotografia autorizada e eventuais informações biográficas adicionais.
- Modalidades de atendimento, público atendido, localização e disponibilidade.
- Finalidades específicas de Avaliação Psicológica efetivamente oferecidas.
- Canal principal, WhatsApp, e-mail e canal para questões de privacidade.
- Responsabilidades sobre dados, configuração real da hospedagem, eventuais
  registros de acesso, finalidades e prazos aplicáveis antes da publicação.
- Aprovação dos textos institucionais e dos artigos, com referências conferidas
  quando utilizadas, e versão final da Política de Privacidade.

Esta etapa não publica o site nem faz merge na `main`.
