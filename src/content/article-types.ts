export const articleCategories = {
  psicologia: "Psicologia",
  "comportamento-humano": "Comportamento humano",
  neurociencias: "Neurociências",
} as const;

export type ArticleSection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  list?: readonly string[];
};

type ArticleBase = {
  slug: string;
  title: string;
  summary: string;
  category: keyof typeof articleCategories;
  createdAt: string;
  sections: readonly ArticleSection[];
  references?: readonly { title: string; url: string }[];
};

export type Article = ArticleBase & (
  | { status: "draft"; editorialNotes: readonly string[]; publishedAt?: never }
  | { status: "published"; publishedAt: string; editorialNotes?: never }
);
