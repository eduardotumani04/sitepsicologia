# Auditoria técnica — 28/10/2026

Registro da auditoria anterior ao refinamento da primeira versão pública.
O escopo atual de seis páginas e as pendências estão em [PUBLICACAO.md](PUBLICACAO.md).

Branch: `feat/site-institucional`. Design, paleta e CSS global preservados.
Não houve publicação, merge na `main` ou acesso à conta real da Hostinger.

## Problemas encontrados e correções

- **SEO:** corrigida a herança incorreta do Open Graph nas páginas internas.
  Metadados exclusivos, imagem social local e robots/sitemap estáticos foram
  implementados. Dados estruturados limitados à pessoa, profissão e CRP informados.
- **Build:** o download de Google Fonts bloqueava a validação neste ambiente.
  A mesma Manrope variável passou a usar `next/font/local`, com licença OFL,
  procedência e integridade do pacote verificadas, preservando a aparência.
- **Acessibilidade:** corrigidos fechamento e foco do menu móvel ao sair por Tab
  ou redimensionar para desktop. Escape e controles existentes foram preservados.
- **Desempenho:** removidos prefetch de rotas e JavaScript desnecessário do
  componente de imagem para o SVG local de 1 KB. Adicionados gzip e cache.
- **Dependências:** corrigido `compression` vulnerável no servidor de preview,
  com override específico para 1.8.2 e instalação limpa, sem downgrade forçado.
- **Hospedagem:** o postbuild gera `.htaccess` com 404, bloqueio de listagem,
  cabeçalhos e CSP com hashes, sem `unsafe-inline` ou `unsafe-eval`.
- **Privacidade:** política ajustada aos recursos locais e à navegação real.
  Não foram adicionados coleta, formulários ou rastreamento. Telemetria das
  ferramentas Next.js desativada nos comandos do projeto.

## Testes efetivamente executados

| Verificação | Resultado |
| --- | --- |
| `npm ci --no-audit --no-fund` | Instalação limpa concluída. |
| `npm run lint` e `npm run typecheck` | Aprovados; lint sem avisos. |
| `npm run build` | Aprovado sem simular fontes; `out/` com 9 páginas, 404, robots, sitemap, recursos e `.htaccess`. |
| `npm audit` | Zero vulnerabilidades conhecidas reportadas, incluindo desenvolvimento. |
| `npm run audit:secrets` | Nenhum padrão de credencial encontrado nos arquivos não ignorados, histórico Git acessível e exportação. |
| Playwright + Chromium contra Apache 2.4.69 local | **27 testes aprovados**, sem ignorados. |
| Apache e preview atualizados | Sintaxe Apache válida; 9 rotas com HTTP 200; 404, bloqueio de `.htaccess`, CSP, gzip e cache verificados. |
| Comparação visual da inicial em 1440 e 390 px | Mesmas dimensões e **zero pixels diferentes** frente à exportação anterior. |

A suíte cobriu nove rotas, links, SEO, hierarquia de títulos, dados estruturados,
menu/teclado/foco, movimento reduzido e larguras de 320 a 1440 px. As nove páginas
passaram nas regras automáticas axe-core WCAG A/AA selecionadas. Foram verificados
recursos locais, Manrope, ausência de cookies/armazenamento local/requisições
externas e funcionamento da CSP, incluindo bloqueio de script injetado.

Medição local: JavaScript inicial de **467.859 bytes** descomprimidos e
**139.660 bytes** com gzip; remoção do componente de imagem economizou 14.840
bytes frente à etapa anterior da auditoria. Requisições antecipadas de navegação
caíram de 21 para zero após carregar e percorrer a inicial. Fonte: 24.836 bytes.
Com atraso simulado de fonte de 200 ms, CLS: 0,00265 no celular e 0,00171 no desktop.
São medições de laboratório, não resultados de Lighthouse ou de usuários reais.

## Pendências e riscos antes de publicar

- **Confirmar domínio HTTPS e liberar indexação.** Atualmente, robots bloqueia
  rastreamento, páginas recebem `noindex`, sitemap não tem entradas e não há
  canonicals/URLs OG inventadas. Preencher `SITE_URL`, habilitar
  `SITE_INDEXING_ENABLED=true` e reconstruir após aprovação. Rascunhos permanecem
  com `noindex`, que não impede acesso direto aos arquivos.
- Confirmar contatos, modalidade/serviços, dados biográficos pendentes, fotografia,
  artigos e privacidade, incluindo responsável, canal e registros da hospedagem.
- **Hostinger real não foi testada.** Após enviar todo o conteúdo de `out/`,
  inclusive arquivos ocultos, validar HTTPS, permissões, módulos, rotas e cabeçalhos.
  Não modificar/minificar HTML após o build: isso invalida os hashes CSP.
- Não foram testados Safari/Firefox, aparelhos físicos ou leitores de tela.
  Axe não certifica acessibilidade integral; a varredura por padrões também não
  garante ausência de todo tipo de segredo.
- ESLint 9 emite aviso de fim de suporte. A atualização para 10 depende dos
  plugins do Next.js e não foi forçada. Manter revisão periódica de dependências.

Detalhes de manutenção: [DESENVOLVIMENTO.md](DESENVOLVIMENTO.md).
Revisão editorial: [EDITORIAL.md](EDITORIAL.md).
