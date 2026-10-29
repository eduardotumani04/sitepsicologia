# Conteúdo e revisão editorial

## Versão pública inicial

A primeira versão tem seis páginas institucionais, sem artigos ou seção de
Conteúdos. Notas internas e dados ainda desconhecidos não aparecem nas páginas;
as pendências ficam em `PUBLICACAO.md`. Nenhuma informação desconhecida foi
inventada. O README original e os textos editoriais desenvolvidos foram preservados.

## Acervo fora das rotas

Tudo fica em `workbench/editorial/`, que não é copiado para `out/`:

- `content/articles/`: os dois rascunhos integrais em arquivos TypeScript.
- `content/article-types.ts`: categorias e tipos de rascunho/artigo publicado.
- `lib/articles.ts`: registro, consulta e formatação de datas.
- `routes/conteudos/`: listagem e modelo completo de artigo estático arquivados.
- `components/`: cards, notas editoriais e a seção de conhecimento da inicial.

Lint e TypeScript verificam também o acervo. Não existem importações dele no
código público. O build limpa `out/` e o postbuild rejeita diretórios de artigos
ou workbench exportados. Os testes verificam ausência dos textos nos recursos,
links e sitemap, além de HTTP 404 nas URLs antigas.

## Reativação futura, sujeita a nova aprovação

1. Revisar os textos, precisão conceitual, autoria e referências verificáveis.
2. Manter `status: "draft"` no material não aprovado, sem `publishedAt` fictício.
   Para artigos aprovados, usar `status: "published"` e a data real de publicação.
3. Criar um registro público contendo **somente artigos aprovados**, separado
   do registro de rascunhos. Não exportar o acervo completo por conveniência.
4. Restaurar as rotas arquivadas em `src/app/conteudos`, ajustando as importações.
   Listagem, `generateStaticParams`, consulta de slug e metadados devem consumir
   somente o registro público; `dynamicParams=false` continua necessário.
5. Revisar os links de navegação e o sitemap para os artigos efetivamente
   publicados. Recolocar a seção da inicial apenas se aprovada.
6. Atualizar a privacidade, os testes e a documentação. Fazer build limpo e
   revisão visual antes de publicar. Não basta adicionar `noindex` a rascunhos.

Os estilos existentes dos componentes editoriais continuam preservados no tema.
Não é necessário CMS, banco de dados, API ou nova dependência para reativação.

## Dados profissionais e canais

`src/lib/contact.ts` centraliza os canais e exige `enabled: true` para exibi-los.
WhatsApp está desativado e sem número; o e-mail previsto
`contato@psieduardotumani.com.br` está cadastrado e **desativado**, aguardando teste
da caixa postal e autorização. Apenas preencher o valor não habilita o canal.
Canal principal requer rótulo, URL HTTPS e ativação explícita. WhatsApp usa formato
internacional com `+`, código do país e número, sem espaços, para gerar `wa.me`.
Não há mensagem clínica pré-preenchida. E-mail usa `mailto:` quando ativado.

`getContactChannels` é a fonte dos cartões e do indicador `hasContactChannel`,
usado pelo cabeçalho, chamadas finais, SEO e privacidade. Não testar a presença
do objeto `contact.email` para decidir exibição: um objeto desativado ainda existe.

O cabeçalho e as chamadas finais não prometem contato sem canal. A página Contato
informa a indisponibilidade de forma objetiva e exibe somente dados preenchidos.
Ao habilitar canais, revisar a Política de Privacidade e os cenários de teste.
Os trechos sobre WhatsApp, e-mail e solicitações de privacidade aparecem somente
quando há canal ativo. Não há formulário nem incorporação de serviço externo.

Formação publicada em Sobre após confirmação editorial do responsável:

- Graduação em Psicologia — Universidade Presbiteriana Mackenzie.
- Terapia Analítico-Comportamental — PUC Paraná.
- Avaliação Psicológica — PUC Campinas.
- Neurociências — Faculdade Sírio-Libanês, identificada como Em andamento.

As especializações confirmadas em Terapia Analítico-Comportamental e Avaliação
Psicológica permanecem nas páginas. A experiência de mais de 15 anos e a atuação
clínica, organizacional e social foram informadas e aprovadas pelo responsável.
Datas, biografia adicional e finalidades específicas de avaliação não são
acrescentadas sem confirmação.

## Serviços confirmados

Modalidade, públicos e regiões ficam em `src/lib/services.ts`. As etiquetas da
inicial, os avisos das páginas de serviços e o resumo em Contato são derivados
dessa estrutura, evitando redações divergentes. Psicoterapia é exclusivamente
online para adultos e idosos; Avaliação Psicológica é presencial para crianças,
adultos e idosos, em Santana e Cerqueira César (Avenida Paulista), São Paulo/SP.
Não acrescentar endereço, horários, valores ou modalidades não informadas.

Os textos teóricos aprovados permanecem intactos. O formulário futuro está
documentado em `FORMULARIO.md`; não há interface ou backend fictício.

Veja `PUBLICACAO.md` para as pendências e `IMAGENS.md` para fotografias e direitos.
Esta etapa não publica o site nem integra mudanças à `main`.
