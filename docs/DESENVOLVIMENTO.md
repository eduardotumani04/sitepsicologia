# Desenvolvimento e publicação

## Requisitos e instalação

- Node.js 24 recomendado, conforme `.nvmrc` (mínimo aceito pelo projeto: 22).
- npm 10 ou superior. O `package-lock.json` deve ser versionado.
- Nenhum banco de dados, chave de API, arquivo `.env` ou serviço externo é necessário em tempo de execução. O download da fonte durante o build depende dos domínios descritos abaixo.

Use a cópia existente do repositório. Em tarefas de nuvem, o ambiente já é
isolado: não é necessário criar outro repositório, worktree ou subpasta de aplicação.
Todos os comandos são executados na raiz do projeto.

```bash
npm ci
npm run dev
```

O desenvolvimento usa a porta 3000, com atualização automática. Encerre o
processo com `Ctrl+C`.

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

A família variável Manrope é carregada por `next/font/google` no layout raiz.
O Next.js baixa os arquivos durante o build e os inclui nos recursos estáticos
do próprio site: o navegador dos visitantes não faz requisições ao Google Fonts.
O ambiente de build precisa permitir acesso HTTPS a `fonts.googleapis.com` e
`fonts.gstatic.com`. O Tailwind CSS 4 associa `--font-sans` à variável
`--font-manrope` por meio de `@theme inline`. Todos os componentes herdam a
mesma família; pesos, tamanhos responsivos e espaçamentos ficam em `globals.css`.

O único componente interativo no cliente é o cabeçalho, para navegação móvel
e indicação da rota atual. As páginas não implementam APIs, autenticação,
armazenamento de informações clínicas, rastreamento ou cookies de marketing.

## Cloudflare Pages

Configure o projeto Pages conectado a este repositório:

- Diretório raiz: raiz do repositório, sem subpasta.
- Comando de build: `npm run build`.
- Diretório de saída: `out`.
- Versão do Node.js: `24` (variável de build `NODE_VERSION`, se necessário).
- Não é necessário adaptador, Worker, Pages Functions ou `next-on-pages`.

O `next.config.ts` define `output: 'export'`, `trailingSlash: true` e
`images.unoptimized: true`. Cada rota possui seu próprio `index.html`,
permitindo acesso direto e atualização do navegador. O build também gera
`404.html`. O recurso `next/image` funciona sem serviço de otimização remoto.

Não faça o upload de `node_modules/` ou `.next/`: publique somente `out/`.
Esta entrega prepara os arquivos; não publica o site nem configura domínio.

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
- Confirmar domínio e hospedagem para configurar URLs canônicas, sitemap,
  imagem de compartilhamento e revisar a política de privacidade conforme
  o funcionamento real da publicação.
- Revisar dados, textos e privacidade antes da divulgação pública.

As mudanças devem ser revisadas na branch de funcionalidade antes de qualquer
merge na `main`.

Consulte [Conteúdo e revisão editorial](EDITORIAL.md) para manter os artigos
locais, preencher contatos e conferir os pontos que dependem de confirmação.
