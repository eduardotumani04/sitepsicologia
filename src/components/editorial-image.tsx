import { editorialImages, type EditorialImagePosition } from "@/lib/editorial-images";

// Espaços sem fotografia autorizada não produzem blocos vazios na versão pública.
// A composição fica preparada para imagens locais já otimizadas, sem serviço de imagem.
export function EditorialImage({ position }: { position: EditorialImagePosition }) {
  const image = editorialImages[position];
  if (!image) return null;
  return (
    <figure className={`editorial-image editorial-image-${position}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- Imagens locais com variantes pré-comprimidas; a exportação não usa otimização em servidor. */}
      <img
        src={image.src}
        srcSet={`${image.smallSrc} ${image.smallWidth}w, ${image.src} ${image.width}w`}
        sizes={position === "inicio" ? "(max-width: 767px) calc(100vw - 48px), 42vw" : "(max-width: 767px) calc(100vw - 48px), 58vw"}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
      />
      <figcaption>{image.credit}</figcaption>
    </figure>
  );
}
