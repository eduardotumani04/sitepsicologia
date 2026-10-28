import type { Article } from "@/content/article-types";
import { comportamentoEContexto } from "@/content/articles/comportamento-e-contexto";
import { conhecerAPsicoterapia } from "@/content/articles/conhecer-a-psicoterapia";

export const articles: readonly Article[] = [comportamentoEContexto, conhecerAPsicoterapia].sort((a, b) =>
  articleDate(b).localeCompare(articleDate(a)) || a.title.localeCompare(b.title, "pt-BR"),
);

export function articleDate(article: Article): string {
  return article.status === "published" ? article.publishedAt : article.createdAt;
}

export function formatArticleDate(date: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function getArticle(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug);
}
