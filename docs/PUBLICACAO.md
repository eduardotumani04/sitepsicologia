# Primeira versão para Hostinger — pendências e revisão

Versão de revisão em 28/10/2026. As rotas públicas são `/`, `/sobre/`,
`/psicoterapia/`, `/avaliacao-psicologica/`, `/contato/` e `/privacidade/`.
Não há deploy ou merge automático.

## Para concluir antes de autorizar a publicação

- Aprovar a composição e os textos desta versão.
- Confirmar o domínio HTTPS oficial e se haverá preferência por www ou sem www.
  Manter a indexação desativada até a aprovação dos dados essenciais.
- Informar pelo menos um canal profissional para habilitar contato funcional.
  Até lá, a página informa honestamente a indisponibilidade; não há CTA de
  agendamento, WhatsApp/e-mail falso ou cartões de preenchimento.
- Revisar a Política de Privacidade: confirmar o responsável, canal para
  solicitações, registros efetivos da Hostinger, finalidades, retenção e demais
  condições aplicáveis. A página descreve os recursos da aplicação sem inventar
  esses dados; retirar notas internas não equivale a uma aprovação jurídica.
- Validar HTTPS, domínio, permissões e suporte aos `.htaccess` no plano contratado.
  Testes locais de Apache não substituem essa verificação na conta real.

## Itens opcionais mantidos fora da apresentação

- Três fotografias editoriais com direitos comerciais verificáveis e retrato
  profissional autorizado: ver `IMAGENS.md`. Nenhuma foto de terceiros foi incluída.
- Denominações oficiais dos cursos e instituições do README, situação atual da
  formação em Neurociências, datas e eventual trajetória biográfica. O README
  original foi preservado; o bloco de formação em revisão saiu da página Sobre.
- Modalidade, público, localização, disponibilidade e finalidades específicas de
  avaliação. Não são anunciados enquanto não forem confirmados; as páginas
  descrevem os processos de maneira geral.
- Artigos e divulgação científica: acervo integral em `workbench/editorial/`,
  fora das rotas e dos recursos exportados. Reativação exige nova revisão.

## Publicação estática, somente após autorização

1. Preencher os dados confirmados em `src/lib/contact.ts` e revisar privacidade.
2. Preencher `SITE_URL` com a origem HTTPS oficial. Ativar
   `SITE_INDEXING_ENABLED=true` somente após aprovação; executar novo build.
3. Executar lint, typecheck, build e testes de navegador. Conferir `out/`.
4. Enviar **somente o conteúdo completo de `out/`**, incluindo `.htaccess`, para
   o diretório público exclusivo deste site. Não enviar o repositório,
   `workbench/`, documentação, `.env`, `.next` ou `node_modules`.
5. Se existir uma versão anterior no destino, fazer backup e substituir sua
   exportação completa, retirando arquivos obsoletos, especialmente `conteudos/`
   e seus recursos antigos. Sobrepor arquivos sem limpar resíduos pode manter
   rascunhos acessíveis. Não apagar outros sites ou dados do cliente.
6. Não modificar/minificar o HTML após o build; os hashes CSP precisam conferir.
7. Verificar as seis rotas diretamente, navegação, 404, cabeçalhos, cache, HTTPS,
   robots e sitemap. `/conteudos/` e URLs antigas de artigos devem retornar 404.

## Visualização antes da publicação

Na raiz do repositório: `npm ci` (quando necessário) e `npm run dev`. A porta é
3000. Para a exportação exata: `npm run build` e
`npm run preview -- --listen 4173`. Abrir `http://localhost:4173` na máquina que
executa o projeto, ou usar o encaminhamento de portas do ambiente, quando disponível.
Endereços de loopback da nuvem não são uma prévia pública acessível pela internet.

## Verificações desta entrega

- Dependências necessárias presentes; `npm run lint`, `npm run typecheck` e
  `npm run build` aprovados. Exportação limpa com as seis páginas e 404.
- **24 testes Playwright/Chromium aprovados**, sem ignorados, contra Apache
  2.4.69 local: navegação, links internos, SEO, acessibilidade automática,
  teclado/menu, movimento reduzido, CSP/cabeçalhos e larguras de 320 a 1440 px.
- Nenhuma rota de Conteúdos, texto de rascunho ou nota editorial na exportação;
  URLs antigas e `/workbench/editorial/` retornaram 404. Textos e tipos dos
  rascunhos conferidos byte a byte com os arquivos anteriores à movimentação.
- `npm run audit:secrets`: nenhum padrão de credencial detectado no estado
  atual, histórico acessível e exportação; a varredura não é garantia absoluta.
- Desenvolvimento na porta 3000: seis rotas com HTTP 200 e três URLs editoriais
  com 404. Preview estático na porta 4173: HTTP 200.
- 14 capturas da exportação geradas para revisão: seis páginas em desktop e
  celular, além de Início e Sobre em tablet. Arquivos locais de revisão não
  fazem parte de `out/` nem são enviados à Hostinger.
- CLS local com atraso de fonte de 200 ms: 0,00245 no celular e 0,00164 no
  desktop. Não são métricas de usuários reais. Nenhuma fotografia nova foi
  carregada ou testada, pois ainda não há arquivos autorizados.

Não foram testados a conta real da Hostinger, Safari/Firefox, leitores de tela
ou aparelhos físicos. A publicação e a indexação continuam dependendo de revisão.
