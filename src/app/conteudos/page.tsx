import type { Metadata } from "next";
import { InteriorPage } from "@/components/interior-page";

export const metadata: Metadata = { title: "Conteúdos", description: "Futuro espaço de divulgação científica sobre Psicologia, comportamento humano e neurociências. Conteúdos em preparação." };

export default function ContentPage() {
  return (
    <InteriorPage eyebrow="Conhecimento e divulgação científica" title="Conhecimento que abre conversas." intro="Psicologia, comportamento humano e neurociências: um espaço para aproximar a ciência das perguntas que fazem parte da vida.">
      <span className="status-tag">Em preparação</span>
      <h2>Os primeiros conteúdos estão por vir</h2>
      <p>Esta área reunirá textos de divulgação científica, reflexões sobre o comportamento e informações sobre Psicologia, com linguagem acessível e referências que possam ser consultadas.</p>
      <p>Ainda não há artigos publicados. Os conteúdos serão disponibilizados após elaboração e revisão.</p>
      <p className="editorial-notice">Os materiais terão finalidade informativa e não substituirão a avaliação ou o acompanhamento de um profissional.</p>
    </InteriorPage>
  );
}
