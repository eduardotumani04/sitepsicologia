# Primeira versão para Hostinger — pendências e revisão

Versão de revisão em 28/10/2026. As rotas públicas são `/`, `/sobre/`,
`/psicoterapia/`, `/avaliacao-psicologica/`, `/contato/` e `/privacidade/`.
Não há deploy ou merge automático.

## Para concluir antes de autorizar a publicação

- Aprovar a composição e os textos desta versão.
- Confirmar o domínio HTTPS oficial e se haverá preferência por www ou sem www.
  Manter a indexação desativada até a aprovação dos dados essenciais.
- Confirmar a criação e o funcionamento da caixa
  `contato@psieduardotumani.com.br` e autorizar sua exibição. O endereço está
  preparado com `enabled: false`, sem link público. WhatsApp continua sem número
  e desativado. Informar e testar o número, se desejar esse canal. Habilitar pelo
  menos um canal antes de lançar uma página de contato funcional.
- Revisar a Política de Privacidade: confirmar o responsável, canal para
  solicitações, registros efetivos da Hostinger, finalidades, retenção e demais
  condições aplicáveis. A página descreve os recursos da aplicação sem inventar
  esses dados; retirar notas internas não equivale a uma aprovação jurídica.
- Validar HTTPS, domínio, permissões e suporte aos `.htaccess` no plano contratado.
  Testes locais de Apache não substituem essa verificação na conta real.
- Confirmar o tipo de hospedagem e de serviço de e-mail, o acesso a logs,
  operadores, finalidades e retenção. Se houver contato ativo, revisar também
  acesso, guarda e descarte das mensagens e o canal para direitos dos titulares.

## Itens opcionais mantidos fora da apresentação

- Três fotografias editoriais com direitos comerciais verificáveis e retrato
  profissional autorizado: ver `IMAGENS.md`. Nenhuma foto de terceiros foi incluída.
- Horários, valores, endereços completos, nomes de consultórios e finalidades
  específicas de avaliação: não são anunciados. Não são necessários para esta
  apresentação institucional. Não adicionar sem confirmação.
- Formulário administrativo: proposta em `FORMULARIO.md`, condicionado ao plano
  Hostinger e backend real. Não existe formulário visual, PHP ou envio fictício.
  Redes sociais continuam sem links, perfis provisórios ou ícones vazios.
- Artigos e divulgação científica: acervo integral em `workbench/editorial/`,
  fora das rotas e dos recursos exportados. Reativação exige nova revisão.

## Publicação estática, somente após autorização

1. Validar os canais, ajustar os campos `enabled` em `src/lib/contact.ts` somente
   após confirmação e revisar privacidade. Apenas preencher um endereço ou número
   não o ativa. Os serviços ficam centralizados em `src/lib/services.ts`.
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

## Informações profissionais confirmadas

- Psicoterapia: exclusivamente online, para adultos e idosos, orientada pela
  Terapia Analítico-Comportamental.
- Avaliação Psicológica: presencial, para crianças, adultos e idosos, nas regiões
  de Santana e Cerqueira César (Avenida Paulista), São Paulo/SP. Sem endereço
  completo ou modalidade adicional anunciados.
- A inicial mostra etiquetas discretas; as páginas dos serviços mostram um
  bloco de informações práticas; Contato apresenta modalidades em duas colunas
  no desktop e uma no celular. Todos consomem `src/lib/services.ts`.
- A formação acadêmica confirmada em revisão posterior já aparece em Sobre:
  Psicologia (Universidade Presbiteriana Mackenzie), Terapia Analítico-Comportamental
  (PUC Paraná), Avaliação Psicológica (PUC Campinas) e Neurociências (Faculdade
  Sírio-Libanês, **Em andamento**). Não foram acrescentadas datas ou diplomas.

## Verificações da atualização de serviços e Contato

- `npm run lint`, `npm run typecheck` e `npm run build`: aprovados, sem erros de
  compilação. `out/` contém as seis páginas, 404, robots, sitemap e `.htaccess`.
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e`:
  **25 aprovados e 1 ignorado**, em Chromium contra o preview estático simples.
  O teste ignorado exige Apache para conferir os cabeçalhos reais; não foi
  executado nesta atualização. O teste de CSP injeta a política gerada em
  respostas locais e passou; isso não valida a conta da Hostinger.
- Navegação, links/âncoras, menu e teclado, regras automáticas de acessibilidade,
  ausência de rastreamento, canais desativados e consistência dos serviços:
  aprovados. Função dos canais testada também com configurações isoladas de
  exemplo, sem ativá-las no site. Nenhum envio de mensagem ou e-mail foi testado.
- Sem rolagem horizontal nas seis páginas em 320, 390, 768, 1024, 1280 e 1440 px.
  Capturas de Contato, serviços e Privacidade geradas em desktop e celular, com
  inspeção visual de Contato, cartões da inicial e avisos de atendimento.
  Modalidades em duas colunas no desktop/tablet e uma no celular; fontes Manrope
  e alinhamento dos subtítulos conferidos em cinco larguras.
- Conteúdos e workbench não são exportados; URLs editoriais retornam 404.
  Nenhum endereço de e-mail, botão WhatsApp ou formulário foi apresentado nas
  seis páginas. Sitemap vazio e noindex preservados enquanto não há domínio e
  aprovação de indexação.
- `npm run audit:secrets`: nenhum padrão de credencial detectado nos arquivos,
  histórico acessível e exportação. Não constitui garantia absoluta.
- Comparação com a versão anterior confirmou que os textos da inicial e os
  conteúdos teóricos dos serviços foram integralmente preservados, além das
  adições solicitadas. Sobre, imagens, fontes, menus, CSS global e InteriorPage
  não foram modificados.

A prévia local utiliza a porta 4173. Não há URL pública fornecida por este
ambiente. Não foram testados hospedagem real, PHP/SMTP, caixa postal, WhatsApp,
Safari/Firefox, aparelhos físicos ou leitores de tela. Não houve merge ou deploy.

## Histórico de verificação da preparação visual inicial

Os resultados abaixo são da etapa que retirou Conteúdos das rotas públicas,
anterior às revisões pontuais de textos e à preparação dos canais. Não representam
uma nova execução em cada revisão; os resultados atuais são registrados no PR.

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
