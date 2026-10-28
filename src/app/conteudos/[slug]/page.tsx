import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articleCategories } from "@/content/article-types";
import { articles, articleDate, formatArticleDate, getArticle } from "@/lib/articles";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { InteriorPage } from "@/components/interior-page";
import { EditorialNote } from "@/components/editorial-note";
import { Arrow } from "@/components/arrow";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const draft = article.status === "draft";
  const title = `${draft ? "Rascunho: " : ""}${article.title}`;
  return pageMetadata({
    title,
    description: article.summary,
    path: `/conteudos/${article.slug}/`,
    indexable: !draft,
    follow: !draft,
    ...(article.status === "published" ? { publishedAt: article.publishedAt } : {}),
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const draft = article.status === "draft";
  const date = articleDate(article);
  return (
    <article className="article-detail" aria-labelledby="page-title">
      <InteriorPage
        eyebrow={`${draft ? "Rascunho editorial" : "Artigo"} · ${articleCategories[article.category]}`}
        title={article.title}
        intro={article.summary}
        backHref="/conteudos/"
        backLabel="Todos os conteúdos"
        sections={article.sections}
        meta={
          <div className="article-byline">
            <p>{draft ? "Rascunho criado em " : "Publicado em "}<time dateTime={date}>{formatArticleDate(date)}</time></p>
            <p>{draft ? "Revisão profissional pendente: " : "Por "}{site.name} · {site.registration}</p>
          </div>
        }
      >
        {article.status === "draft" && (
          <EditorialNote title="Rascunho editorial — não aprovado para publicação">
            {article.editorialNotes.map(note => <p key={note}>{note}</p>)}
          </EditorialNote>
        )}
        {article.sections.map(section => (
          <section className="reading-section" id={section.id} key={section.id} aria-labelledby={`${section.id}-titulo`}>
            <h2 id={`${section.id}-titulo`}>{section.title}</h2>
            {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            {section.list && <ul className="information-list">{section.list.map(item => <li key={item}>{item}</li>)}</ul>}
          </section>
        ))}
        {article.references && article.references.length > 0 && (
          <section className="reading-section" aria-labelledby="referencias-titulo">
            <h2 id="referencias-titulo">Referências</h2>
            <ul className="information-list">{article.references.map(reference => <li key={reference.url}><a href={reference.url} rel="noreferrer">{reference.title}</a></li>)}</ul>
          </section>
        )}
        <div className="article-endnote"><p>Conteúdo informativo. A leitura não substitui a avaliação ou o acompanhamento psicológico individualizado.</p><Link prefetch={false} href="/conteudos/" className="text-link">Voltar aos conteúdos <Arrow /></Link></div>
      </InteriorPage>
    </article>
  );
}
