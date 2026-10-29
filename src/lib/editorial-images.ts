// Só preencher depois de conferir e registrar origem, autoria e licença em docs/IMAGENS.md.
// O nome identifica uma posição editorial, não uma fotografia já fornecida.
export type EditorialImagePosition = "inicio" | "sobre" | "psicoterapia";
export type EditorialPhotograph = {
  src: `/images/${string}.webp` | `/images/${string}.avif`;
  smallSrc: `/images/${string}.webp` | `/images/${string}.avif`;
  width: number;
  height: number;
  smallWidth: number;
  alt: string;
  credit: string;
};

export const editorialImages: Record<EditorialImagePosition, EditorialPhotograph | null> = {
  inicio: null,
  sobre: null,
  psicoterapia: null,
};
