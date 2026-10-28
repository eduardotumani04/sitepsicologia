# Site Psicologia

Site profissional de Eduardo Villela Tumani.

Psicólogo - CRP 06/127526

Formação e Especializações:
- Psicologia pela Universidade Mackenzie
- Terapia Analítico-Comportamental pela PUC Paraná
- Avaliação Psicológica pela PUC Campinas
- Neurociências pela Faculdade Sírio Libanês (em andamento)

## Objetivo
Desenvolver um site institucional responsivo, acessível e otimizado para mecanismos de busca, com apresentação profissional, informações sobre serviços, conteúdos científicos e contato.

## Tecnologias
- Next.js
- TypeScript
- Tailwind CSS

## Desenvolvimento
Projeto desenvolvido com auxílio do OpenAI Codex.

## Executar o site

O projeto está na raiz deste repositório e utiliza Next.js com App Router,
TypeScript, Tailwind CSS e npm. Recomenda-se Node.js 24 (veja `.nvmrc`).

```bash
npm ci
npm run dev
```

O servidor de desenvolvimento utiliza a porta 3000. Para verificar a versão de
produção exportada:

```bash
npm run lint
npm run typecheck
npm run build
npm run preview
```

O build gera o diretório `out/`, pronto para hospedagem estática. O preview
utiliza a porta 3000 por padrão; encerre o servidor de desenvolvimento antes de
iniciá-lo ou informe outra porta com `npm run preview -- --listen 4173`.

As instruções de testes, arquitetura, publicação estática na Hostinger e os itens
pendentes estão em [Desenvolvimento e publicação](docs/DESENVOLVIMENTO.md).

## Primeira versão pública em revisão

A versão atual possui seis páginas institucionais. Conteúdos e artigos estão
preservados em `workbench/editorial/`, fora das rotas e da exportação pública.
A indexação permanece desativada até confirmação do domínio e aprovação.

Veja [Publicação e pendências](docs/PUBLICACAO.md),
[Imagens e direitos de uso](docs/IMAGENS.md) e
[Conteúdo editorial](docs/EDITORIAL.md). Fotografias de terceiros ainda não foram
incluídas por falta de verificação de direitos neste ambiente.
