import type { Article } from "../article-types";

export const comportamentoEContexto: Article = {
  slug: "comportamento-e-contexto",
  title: "Comportamento e contexto: perguntas para começar uma conversa",
  summary: "Rascunho de um texto sobre a importância de observar as situações em que os comportamentos acontecem, antes de buscar explicações prontas.",
  category: "comportamento-humano",
  status: "draft",
  createdAt: "2026-10-28",
  editorialNotes: [
    "Exemplo editorial elaborado para demonstrar a apresentação de um artigo. O texto ainda não foi aprovado para publicação por Eduardo Villela Tumani.",
    "Revisar a precisão conceitual, aprofundar a argumentação e selecionar fontes científicas verificáveis antes da publicação. Não foram incluídas referências demonstrativas.",
  ],
  sections: [
    {
      id: "olhar-para-a-situacao",
      title: "Olhar para a situação também é olhar para a pessoa",
      paragraphs: [
        "Dizer que alguém evita uma conversa descreve algo que aconteceu, mas ainda deixa muitas perguntas em aberto. Com quem era a conversa? O que vinha acontecendo antes? O que mudou quando a pessoa se afastou?",
        "Essas perguntas deslocam o olhar de uma explicação pronta sobre como a pessoa é para uma investigação das relações envolvidas naquela situação. O contexto não é apenas o lugar físico: inclui outras pessoas, condições de vida e experiências relevantes.",
      ],
    },
    {
      id: "historia-e-presente",
      title: "Uma história que se encontra com o presente",
      paragraphs: [
        "As maneiras de responder a diferentes situações se constroem ao longo da vida. Uma forma de agir que ajudou em determinado momento pode continuar aparecendo mesmo quando as condições mudam.",
        "Investigar a história de aprendizagem ajuda a formular perguntas sobre essas relações. Isso não permite concluir, a partir de um exemplo isolado, o que explica o comportamento de alguém. A compreensão exige informações e pode precisar ser revista.",
      ],
    },
    {
      id: "perguntas-e-limites",
      title: "Perguntas que abrem espaço para compreender",
      paragraphs: [
        "Na elaboração deste texto, a proposta é explorar como perguntas sobre situações, relações e consequências podem ampliar uma conversa sobre comportamento. Elas não constituem um roteiro de avaliação individual nem um exercício de autodiagnóstico.",
      ],
      list: [
        "Em quais situações esse comportamento aparece?",
        "O que costuma acontecer antes e depois?",
        "Quais relações e condições de vida precisam ser consideradas?",
        "Que informações ainda faltam para compreender essa situação?",
      ],
    },
  ],
};
