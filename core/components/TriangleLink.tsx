import * as React from "react";

interface Props {
  containerRef: React.RefObject<HTMLDivElement>;
  paragraphRef: React.RefObject<HTMLDivElement>;
  linkContainerClassName?: React.HTMLAttributes<HTMLDivElement>["className"];
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
}

/**
 * Composant TriangleLink.
 *
 * @remarks
 * Ce composant représente une moitié du rectangle sous forme de triangle cliquable grâce à un bouton.
 *
 * @param containerRef - L'objet référence au container du bouton.
 * @param paragraphRef - L'objet référence au paragraphe du bouton.
 * @param linkContainerClassName - les classes du container du bouton.
 * @param onClick - La fonction callback après le clic.
 * @param text - Le texte du bouton.
 * @returns Un élément représentant le composant TriangleLink.
 */
const TriangleLink: React.FunctionComponent<Props> = ({
  containerRef,
  paragraphRef,
  linkContainerClassName = "",
  onClick,
  text,
}) => (
  <div ref={containerRef} className="absolute w-full h-full z-50">
    <button onClick={onClick} className="inline-block w-full h-full relative">
      <div className={linkContainerClassName}>
        <p ref={paragraphRef} className="line-clamp-3">
          {text}
        </p>
      </div>
    </button>
  </div>
);

export default TriangleLink;
