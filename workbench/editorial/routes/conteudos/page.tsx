import { pageMetadata } from "@/lib/seo";
import { InteriorPage } from "@/components/interior-page";
import { ArticleCard } from "../../components/article-card";
import { EditorialNote } from "../../components/editorial-note";
import { articles } from "../../lib/articles";
import { articleCategories } from "../../content/article-types";

const published = articles.filter(article => article.status === "published");
const drafts = articles.filter(article => article.status === "draft");

export const metadata = pageMetadata({
  title: "Conteúdos",
  description: "Um espaço para artigos autorais sobre Psicologia, comportamento humano e neurociências. Conheça os rascunhos editoriais disponíveis para revisão.",
  path: "/conteudos/",
  indexable: published.length > 0,
});

export default function ContentPage() {
  return (
    <InteriorPage
      eyebrow="Conhecimento e divulgação científica"
      title="Conhecimento que abre conversas."
      intro="Psicologia, comportamento humano e neurociências: um espaço para aproximar a ciência das perguntas que fazem parte da vida, com linguagem acessível e cuidado na elaboração."
      sections={[
        { id: "artigos", title: "Artigos publicados" },
        ...(drafts.length ? [{ id: "rascunhos", title: "Rascunhos editoriais" }] : []),
        { id: "leitura", title: "Sobre os conteúdos" },
      ]}
    >
      <section className="reading-section" id="artigos" aria-labelledby="artigos-titulo">
        <h2 id="artigos-titulo">Artigos publicados</h2>
        {published.length ? (
          <ul className="article-list">{published.map(article => <li key={article.slug}><ArticleCard article={article} /></li>)}</ul>
        ) : (
          <div className="content-empty"><span className="small-label">Em elaboração</span><p>Ainda não há artigos definitivos publicados. Os textos serão disponibilizados nesta seção depois da revisão profissional e da aprovação editorial.</p></div>
        )}
      </section>
      {drafts.length > 0 && (
        <section className="reading-section" id="rascunhos" aria-labelledby="rascunhos-titulo">
          <h2 id="rascunhos-titulo">Rascunhos para revisão editorial</h2>
          <p>Os exemplos abaixo apresentam a estrutura de leitura dos futuros artigos. São textos em elaboração, ainda não aprovados como publicações autorais definitivas.</p>
          <ul className="article-list">{drafts.map(article => <li key={article.slug}><ArticleCard article={article} /></li>)}</ul>
        </section>
      )}
      <section className="reading-section" id="leitura" aria-labelledby="leitura-titulo">
        <h2 id="leitura-titulo">Informação com contexto e responsabilidade</h2>
        <p>Os conteúdos terão finalidade informativa. Um texto pode ajudar a conhecer um tema e a formular perguntas, mas não permite avaliar uma situação individual nem substituir o acompanhamento profissional.</p>
        <p>Os temas previstos para este espaço são:</p>
        <ul className="topic-labels">{Object.values(articleCategories).map(category => <li key={category}>{category}</li>)}</ul>
        <EditorialNote><p>Cada rascunho precisa passar por revisão de conteúdo, conferência de eventuais referências e aprovação de autoria antes de receber uma data de publicação. As datas exibidas nos rascunhos identificam sua criação editorial.</p></EditorialNote>
      </section>
    </InteriorPage>
  );
}
