# Formulário administrativo — proposta para etapa posterior

## Estado atual

Não existe formulário, endpoint PHP, envio SMTP ou processamento de mensagens
nesta versão. O site continua sendo uma exportação estática do Next.js, sem
backend Node.js. Não há simulação de envio por JavaScript ou `mailto:`.

Os canais de contato também permanecem desativados até confirmação. Este documento
é uma proposta técnica; não confirma recursos do plano Hostinger nem autoriza
implantação ou contratação de serviços.

## Viabilidade com Hostinger

Um endpoint PHP na mesma origem pode receber mensagens da exportação estática e
enviá-las por SMTP com PHPMailer. Isso exige confirmar no plano contratado:

- Execução de uma versão de PHP com suporte de segurança e extensões necessárias.
- Possibilidade de instalar PHPMailer com Composer em diretório privado.
- Acesso a arquivos fora de `public_html` e permissões para proteger credenciais.
- SMTP autenticado, caixa postal existente, limites de envio e conexão TLS válida.
- Nome do servidor, porta e modo de criptografia fornecidos pelo serviço real.
- Recursos para limitar requisições e monitorar falhas, com retenção definida.

Hospedagem estritamente estática não executa PHP. Nesse caso, será preciso escolher
um backend separado compatível, revisar privacidade e autorizar o provedor antes
de qualquer integração. Não implementar Route Handlers ou Server Actions no
projeto exportado.

## Estrutura proposta

1. Manter a interface em Next.js com exportação estática. Publicá-la somente
   quando o endpoint estiver implantado e os testes de entrega forem aprovados.
2. Colocar apenas o script de entrada PHP no diretório público, por exemplo
   `/contato/enviar.php`. Manter PHPMailer, configuração, credenciais, controles
   de abuso e registros fora desse diretório. O PHP será uma entrega separada de
   `out/`; o build atual não o gera.
3. Usar POST para a mesma origem. Fazer degradação acessível quando JavaScript
   estiver indisponível, com resposta de sucesso ou erro real do servidor.
4. Rever explicitamente a CSP atual: `form-action 'none'` bloqueia formulários.
   Permitir `form-action 'self'` apenas na etapa funcional; `connect-src 'self'`
   já limita eventuais requisições JavaScript à mesma origem. Preservar hashes
   dos scripts e demais proteções. Não mudar essa política nesta tarefa.

## Campos e finalidade

- Nome: texto simples, máximo inicial sugerido de 100 caracteres.
- E-mail: endereço válido, máximo de 254 caracteres.
- Assunto: enumeração fechada validada no servidor:
  - Informações sobre Psicoterapia;
  - Informações sobre Avaliação Psicológica;
  - Outras informações profissionais.
- Mensagem breve: texto simples, limite inicial sugerido de 1.000 caracteres.

Informar, antes do envio, que o canal se destina a solicitações administrativas e
informações gerais, sem relatos clínicos, documentos ou resultados de testes.
Não oferecer anexos, dados de saúde, prontuário ou campos clínicos. Mesmo com esse
aviso, texto livre pode conter informações sensíveis: prever acesso restrito,
orientação de manejo e descarte, sem alegar que esse risco é inexistente.

## Validação, envio e proteção

- Revalidar tudo no PHP: método, tamanho total do corpo, campos permitidos,
  obrigatoriedade, limites, formato do e-mail e assunto da lista autorizada.
  Rejeitar cabeçalhos injetados, conteúdo excessivo e anexos inesperados.
- Usar remetente e destinatário fixos da conta profissional, configurados no
  servidor. O e-mail do visitante pode ser `Reply-To` após validação; nunca
  aceitar destinatário arbitrário, evitando um relay aberto.
- Usar PHPMailer mantido, SMTP autenticado e TLS com validação de certificado.
  Não desativar a verificação TLS. Não inventar host, porta ou senha do provedor.
- Combinar limitação de tamanho, frequência e volume global com um campo-isca
  (honeypot), quando apropriado. Esse campo deve ficar fora da navegação e da
  árvore de acessibilidade, sem confundir usuários.
  Não depender apenas de validação no navegador ou de `Origin`/`Referer`.
- Prever token de proteção contra submissão entre origens e verificação de
  origem como defesa adicional. Definir como o token será obtido de PHP sem
  embuti-lo como segredo em HTML estático; avaliar sessão e seus cookies antes
  de implementá-los e atualizar a política de privacidade.
- Armazenar contadores de abuso em mecanismo privado e atômico, com expiração;
  não usar arquivos públicos, dados clínicos ou logs completos de mensagens.
  IP e identificadores pseudonimizados também exigem finalidade e retenção.
- Só adicionar CAPTCHA externo se necessário, após avaliar acessibilidade,
  privacidade, CSP e autorização do responsável. Nenhum CAPTCHA nesta versão.
- Responder com códigos HTTP coerentes, mensagens acessíveis e limites claros.
  Nunca expor stack traces, credenciais, respostas SMTP detalhadas ou conteúdo
  enviado em URLs. Escapar os dados caso sejam exibidos em HTML.
- Confirmar sucesso apenas após aceitação pelo SMTP, sem prometer entrega na
  caixa de entrada. Prever prevenção de duplicidade e recuperação de falhas sem
  responder falsamente que uma mensagem foi enviada.

Credenciais devem vir de variáveis do ambiente PHP ou arquivo privado fora do
repositório e de **todos os diretórios públicos**. Não usar `NEXT_PUBLIC_*`,
`.env` copiado para `out/`, JavaScript, HTML ou documentação para segredos.

## Privacidade e validação antes de ativar

Confirmar responsável, finalidade, fundamento aplicável, operadores, provedor de
e-mail, retenção, controle de acesso, descarte e canal para direitos dos titulares.
Atualizar a política para refletir o processamento real, inclusive cookies de
sessão se adotados. Rever SPF, DKIM e DMARC conforme o serviço escolhido.

Testar em ambiente de homologação autorizado: teclado e leitor de tela,
validação servidor/cliente, injeção de cabeçalhos e HTML, limites de requisição,
spam, falhas SMTP/TLS, respostas sem vazamento de dados, duplicidade, entrega e
resposta em caixas reais controladas. Conferir também acesso negado a arquivos
privados, logs e segredos, além de ausência deles no repositório e em `out/`.

Nenhum desses testes de PHP, SMTP ou entrega foi executado nesta etapa: o backend
e o plano de hospedagem ainda não estão confirmados.
