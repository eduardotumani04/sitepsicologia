# Acervo editorial fora da versão pública

Este diretório preserva os dois rascunhos, seus tipos, registro, listagem,
modelo de artigo, cards, notas editoriais e a seção da inicial já desenvolvidos.
Não é uma rota do Next.js nem fica dentro de `public/`. Nenhum módulo público
importa este acervo. TypeScript e lint continuam verificando seus arquivos.

- `content/`: textos integrais dos rascunhos e tipos de conteúdo.
- `lib/articles.ts`: registro e utilitários de datas.
- `routes/conteudos/`: listagem e modelo estático de artigo arquivados.
- `components/`: componentes editoriais, inclusive `KnowledgeSection` da inicial.

As importações foram ajustadas para os novos caminhos. Os estilos editoriais
existentes foram preservados no tema global, sem gerar conteúdo público.

Para reativar, seguir `docs/EDITORIAL.md`: revisar os textos, exportar apenas
artigos aprovados, recolocar as rotas, revisar sitemap/navegação/privacidade e
atualizar testes. Não basta mover a pasta e exportar indiscriminadamente o registro
atual: os textos continuam sendo rascunhos não aprovados.
