import Link from "next/link";
import { articleCategories, type Article } from "../content/article-types";
import { articleDate, formatArticleDate } from "../lib/articles";
import { Arrow } from "@/components/arrow";

export function ArticleCard({ article }: { article: Article }) {
  const draft = article.status === "draft";
  const date = articleDate(article);
  return (
    <Link prefetch={false} className="article-card" href={`/conteudos/${article.slug}/`} aria-labelledby={`${article.slug}-title ${article.slug}-action`}>
      <div className="article-card-meta"><span>{articleCategories[article.category]}</span><span className="article-status">{draft ? "Rascunho editorial" : "Artigo publicado"}</span></div>
      <h3 id={`${article.slug}-title`}>{article.title}</h3>
      <p>{article.summary}</p>
      <p className="article-date">{draft ? "Rascunho criado em " : "Publicado em "}<time dateTime={date}>{formatArticleDate(date)}</time></p>
      <span className="article-card-action" id={`${article.slug}-action`}>{draft ? "Revisar rascunho" : "Ler artigo"}<Arrow direction="diagonal" /></span>
    </Link>
  );
}
