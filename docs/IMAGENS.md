# Imagens e direitos de uso

## Situação desta entrega

**Nenhuma fotografia de terceiros foi incluída.** Em 28/10/2026, a tentativa de
consultar `https://unsplash.com/license` foi bloqueada pelo proxy de rede com
HTTP 403. Não foi possível verificar páginas de fotografias e suas licenças;
por isso não foram utilizados downloads aleatórios nem imagens com direitos
presumidos. Uma fonte alternativa consultada também não ofereceu comprovação
suficiente e não foi utilizada.

Três posições estão preparadas em `src/lib/editorial-images.ts`, utilizando o
componente de servidor `EditorialImage`. Enquanto o valor é `null`, a posição
não produz imagem, legenda provisória ou bloco vazio nas páginas públicas.

| Posição | Direção editorial | Arquivos locais pendentes | Dimensões sugeridas |
| --- | --- | --- | --- |
| `inicio` | Luz natural, arquitetura discreta em areia e off-white; sem pessoas ou marcas | `public/images/editorial-luz.webp` e `editorial-luz-600.webp` | 1200 × 800 e 600 × 400 |
| `sobre` | Natureza em verde-sálvia, textura orgânica ou vegetação com composição simples | `public/images/editorial-natureza.webp` e `editorial-natureza-600.webp` | 1200 × 750 e 600 × 375 |
| `psicoterapia` | Arquitetura minimalista, luz e sombras suaves; sem referência a uma clínica real | `public/images/editorial-espaco.webp` e `editorial-espaco-600.webp` | 1200 × 800 e 600 × 400 |

Os nomes são uma especificação de entrega; os arquivos ainda **não existem** e
nenhuma URL inexistente é usada no HTML. AVIF também é aceito. Não aumentar uma
imagem pequena para atingir essas medidas. Meta de tamanho: até cerca de 150 KB
na maior variante e 55 KB na menor, conferindo nitidez e dimensões reais.

## Conferência obrigatória antes da inclusão

1. Identificar a página original da fotografia, o fotógrafo e o arquivo exato.
2. Conferir a licença aplicável àquela imagem e a autorização comercial. No
   Unsplash, distinguir fotografias gratuitas de conteúdos Unsplash+ e verificar
   os termos atuais. Não presumir autorização por estar em um resultado de busca.
3. Evitar pessoas identificáveis, obras de arte, logotipos e propriedades que
   exijam permissões adicionais. A fotografia é editorial: não representa o
   consultório, o endereço, pacientes ou o próprio profissional.
4. Registrar abaixo autor, URL da fotografia, URL e versão/data de consulta da
   licença, evidência da autorização, arquivo original e hash SHA-256.
5. Salvar apenas as variantes otimizadas em `public/images`, sem metadados
   desnecessários. Preencher os caminhos, dimensões reais, texto alternativo e
   crédito em `src/lib/editorial-images.ts`. O componente usa `srcset`, dimensões
   explícitas e carregamento tardio, sem acesso externo.
6. Executar build, testes e revisão visual em desktop, tablet e celular.

## Fontes das imagens já existentes

- `public/images/espaco-retrato.svg`: composição abstrata local criada para este
  projeto e já presente na identidade aprovada. Não é fotografia. O espaço do
  retrato continua reservado, sem substituir Eduardo por outra pessoa. Os avisos
  de preenchimento foram retirados da apresentação pública.
- `public/opengraph.png`: cartão tipográfico criado para o próprio site, gerado
  por `scripts/generate-social-image.mjs`. Usa Manrope sob OFL-1.1; licença e
  procedência da fonte em `src/app/fonts/`. Não contém fotografia de terceiros.
- `public/icon.svg`: ícone tipográfico existente do próprio projeto.

## Registro de novas fotografias

Nenhum registro aprovado nesta entrega. As três fotografias editoriais e o
retrato profissional autorizado permanecem pendentes; é possível revisar a
composição atual sem incluí-los, sem comprometer o funcionamento das páginas.
