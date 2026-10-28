# Desenvolvimento e publicação

## Requisitos e instalação

- Node.js 24 recomendado, conforme `.nvmrc` (mínimo aceito pelo projeto: 22).
- npm 10 ou superior. O `package-lock.json` deve ser versionado.
- Nenhum banco de dados, chave de API ou serviço externo é necessário. As fontes estão incluídas no projeto. As variáveis opcionais de SEO estão em `.env.example`.

Use a cópia existente do repositório. Em tarefas de nuvem, o ambiente já é
isolado: não é necessário criar outro repositório, worktree ou subpasta de aplicação.
Todos os comandos são executados na raiz do projeto.

```bash
npm ci
npm run dev
```

O desenvolvimento usa a porta 3000, com atualização automática. Encerre o
processo com `Ctrl+C`. Os comandos de desenvolvimento e build desativam a
telemetria da ferramenta Next.js por meio de um wrapper compatível com Windows e Unix.

## Verificações

```bash
npm run lint
npm run typecheck
npm run build
```

O build exporta as páginas para `out/`. Não use `next start`: esta aplicação é
exportada, sem servidor Next.js em produção.

Para inspecionar o resultado estático:

```bash
npm run preview -- --listen 4173
```

O comando `preview` serve apenas para desenvolvimento e validação local. Não
faz parte da hospedagem de produção.

### Testes de navegador

Após o build, instale o navegador do Playwright e execute:

```bash
npx playwright install chromium
npm run test:e2e
```

Em Linux, bibliotecas de sistema podem ser necessárias. O comando oficial
`npx playwright install --with-deps chromium` instala essas bibliotecas quando
há permissão para isso. Se o ambiente já fornecer Chromium, use seu executável:

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

Os testes usam o resultado de produção em `out/`, iniciam o servidor estático
na porta 4173 e o encerram ao terminar. Cobrem as páginas institucionais e as rotas de artigos, metadados, links
internos, menu móvel, acesso por teclado, ausência de rolagem horizontal de
320 a 1440 pixels, recursos locais e regras automáticas de acessibilidade
WCAG A/AA com axe-core. A verificação automática não substitui uma revisão
manual com leitores de tela nem testes em dispositivos físicos.

## Organização

```text
src/
  app/
    layout.tsx                  Estrutura global e metadados
    page.tsx                    Página inicial completa
    globals.css                 Tema Tailwind e estilos responsivos
    sobre/page.tsx
    psicoterapia/page.tsx
    avaliacao-psicologica/page.tsx
    conteudos/page.tsx
    conteudos/[slug]/page.tsx   Modelo estático de artigo
    contato/page.tsx
    privacidade/page.tsx
    not-found.tsx               Página 404
  components/                  Cabeçalho, rodapé e elementos compartilhados
  content/                     Tipos e arquivos locais dos artigos
  lib/site.ts                  Identificação profissional e navegação
public/
  icon.svg                     Ícone tipográfico do site
  images/espaco-retrato.svg     Composição local para o futuro retrato
tests/site.spec.ts             Testes funcionais e de acessibilidade
```

A família variável Manrope é carregada por `next/font/local` no layout raiz.
O arquivo WOFF2 latino oficial está em `src/app/fonts/`, com licença OFL e
procedência documentadas. O mesmo arquivo de 24.836 bytes da revisão visual
é processado localmente: não há acesso ao Google Fonts no build ou na visita.
O Tailwind CSS 4 associa `--font-sans` a `--font-manrope` por `@theme inline`.
Todos os componentes mantêm os pesos, tamanhos e espaçamentos aprovados.

O único componente interativo no cliente é o cabeçalho, para navegação móvel
e indicação da rota atual. As páginas não implementam APIs, autenticação,
armazenamento de informações clínicas, rastreamento ou cookies de marketing.
O SVG local de 1 KB usa imagem nativa com dimensões e prioridade explícitas;
não há otimização em servidor ou JavaScript adicional do componente Next/Image.
Fotografias futuras precisam ser preparadas em tamanhos e formatos adequados
antes de sua inclusão. A imagem de compartilhamento PNG não é uma fotografia.

## SEO e domínio oficial

Sem domínio confirmado, não há canonical, URL Open Graph ou URLs inventadas
no sitemap. O `robots.txt` bloqueia rastreamento e as páginas recebem noindex.
O sitemap exportado fica sem entradas enquanto a indexação está desativada.

Após confirmar o domínio e aprovar o conteúdo, copie `.env.example` para
`.env.local` (não versionado), preencha `SITE_URL` com a origem HTTPS oficial,
sem caminho, parâmetros ou credenciais, e habilite `SITE_INDEXING_ENABLED=true`.
Execute um novo build. As variáveis também podem ser fornecidas pelo ambiente
de build. Não são segredos e não exigem prefixo `NEXT_PUBLIC_`.

Canonicals e Open Graph usam a origem oficial. O sitemap inclui somente páginas
aptas à indexação e artigos publicados; exclui rascunhos, a política ainda em
revisão e o contato enquanto não houver canal confirmado. Artigos em rascunho
continuam com noindex mesmo após habilitar a indexação geral. Noindex e robots
não restringem acesso a arquivos; não são autenticação.

A imagem de compartilhamento local está em `public/opengraph.png`. Para
regenerá-la com os dados de `src/lib/site.ts`, use Node.js 24 e execute
`npm run social:image` com o Chromium do Playwright disponível. Não é necessário
regenerá-la em cada build. Os dados estruturados descrevem somente a pessoa,
a profissão e o registro informados; não há endereço, localização, avaliações
ou promessas nos dados estruturados.

## Hostinger: hospedagem estática

1. Execute `npm ci`, `npm run lint`, `npm run typecheck` e `npm run build`.
2. Envie **o conteúdo completo de `out/`** para o diretório público configurado
   na Hostinger, normalmente `public_html`. Inclua todos os `.htaccess` ocultos,
   subdiretórios e arquivos do Next.js. Não envie o repositório, `.env`,
   `node_modules` ou `.next`. Não é necessário Node.js no servidor de hospedagem.
3. Preserve os diretórios de cada rota. O projeto usa `output: 'export'`,
   `trailingSlash: true` e imagens sem otimização em servidor. Não configure
   um fallback de SPA que transforme qualquer URL inexistente em HTTP 200.
4. Configure o certificado HTTPS e o domínio preferido no painel da hospedagem.
   Depois, confira links diretos, atualização de páginas, 404, robots e sitemap.
5. Verifique na hospedagem real se os cabeçalhos, a compressão e o cache foram
   aplicados. A configuração é preparada para Apache/LiteSpeed; a disponibilidade
   de módulos e permissões depende do plano. Publicação e validação no domínio
   real não são feitas pelo build.

O `postbuild` gera `.htaccess` com página 404, bloqueio de listagem, UTF-8,
compressão de texto quando mod_deflate estiver disponível e cabeçalhos de
segurança. Recursos com hash em `_next/static` recebem cache imutável; HTML
revalida. A CSP permite somente scripts da própria origem e scripts inline
com hashes calculados para cada página. Estilos vêm dos arquivos locais:
não há `unsafe-eval` nem `unsafe-inline` para scripts ou estilos.
Formulários e incorporação em frames são
bloqueados nesta versão, que não possui formulários.

**Não modifique ou minifique HTML depois do build**: os hashes CSP deixam de
conferir se os scripts inline forem alterados. Alterações exigem novo build e
reenvio dos arquivos e `.htaccess` correspondentes. Recursos novos, formulários,
fontes ou integrações externas exigem revisão da CSP e da Política de Privacidade.

### Auditoria e testes de hospedagem

```bash
npm audit
npm run audit:secrets
```

A varredura local examina padrões de credenciais no estado atual e nos blobs do
histórico Git acessível. Mostra somente contagens, arquivos e tipos de ocorrência,
sem valores. Não substitui revisão manual nem detecta todas as formas de segredo.
A dependência `compression` do preview está corrigida via override específico
enquanto o pacote `serve` fixa uma versão vulnerável; manter o lockfile e rever
o override quando o upstream atualizar.

O teste de cabeçalhos Apache é ignorado no preview simples, que não interpreta
`.htaccess`. Para executar contra um servidor Apache local preparado com a
mesma pasta `out/`, informe sua origem em `PLAYWRIGHT_BASE_URL` e rode
`npm run test:e2e`. A auditoria utilizou a imagem oficial `httpd:2.4-alpine`,
Apache 2.4.69, com diretório somente leitura e `AllowOverride All`.
A configuração reprodutível está em `tests/fixtures/apache.conf` (UID 1000 do
ambiente de nuvem, porta interna 8080). Docker é opcional para auditoria;
não é requisito do desenvolvimento, do build ou da Hostinger.

A suíte verifica também títulos e Open Graph exclusivos, hierarquia de títulos,
robots, sitemap, canonicals quando configurados, dados estruturados, CSP real,
foco ao sair do menu e ao redimensionar, movimento reduzido e estabilidade visual.
O teste de estabilidade simula 200 ms no carregamento da fonte; o CLS medido é
local e não constitui uma medição de usuários reais ou um resultado de Lighthouse.

## Conteúdo e próxima etapa

- As páginas institucionais têm conteúdo desenvolvido, com índices de leitura,
  links relacionados e dados pendentes identificados para revisão editorial.
  A página inicial foi preservada.
- A formação foi preservada a partir das informações já existentes no README.
- Substituir a composição abstrata pelo retrato profissional autorizado,
  preferencialmente em WebP ou AVIF, mantendo dimensões e texto alternativo.
- Confirmar telefone, e-mail e/ou canal de contato antes de habilitar links.
  Não há botão inativo disfarçado de envio, nem formulário nesta versão.
- Confirmar a trajetória e as informações de atendimento destacadas nas notas
  editoriais antes da publicação.
- Elaborar e revisar os conteúdos científicos antes de publicá-los.
- Confirmar o domínio, habilitar a indexação somente após aprovação e revisar
  a política de privacidade conforme o funcionamento real da hospedagem.
- Revisar dados, textos e privacidade antes da divulgação pública.

As mudanças devem ser revisadas na branch de funcionalidade antes de qualquer
merge na `main`.

Consulte [Conteúdo e revisão editorial](EDITORIAL.md) para manter os artigos
locais, preencher contatos e conferir os pontos que dependem de confirmação.
