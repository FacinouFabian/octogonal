import * as React from "react";
import TriangleLink from "./TriangleLink";
import { useRouter } from "next/navigation";

interface Props {
  reverse?: boolean; // Inverse le sens du triangle.
  rowIndex: number; // L'index de la ligne de la grille.
  colIndex: number; // L'index de la colonne de la grille.
  colors: {
    left: string; // La couleur du triangle gauche.
    right: string; // La couleur du triangle droit.
  };
  links: {
    left: { href: string; text: string; description: string };
    right: { href: string; text: string; description: string };
  };
}

/**
 * Composant DividedRectangle.
 *
 * @remarks
 * Ce composant représente un rectangle découpé en deux triangles interactifs.
 *
 * @param props - Propriétés du composant.
 * @returns Un élément représentant le composant DividedRectangle.
 */
const DividedRectangle = (props: Props) => {
  const { reverse = false, rowIndex, colIndex, colors, links } = props;
  const divRef = React.useRef<HTMLDivElement>(null);
  const canvas = React.useRef<HTMLCanvasElement>(null);
  const canvasMask = React.useRef<HTMLCanvasElement>(null);
  const leftTriangleRef = React.useRef<HTMLDivElement>(null);
  const rightTriangleRef = React.useRef<HTMLDivElement>(null);
  const leftTriangleParagraphRef = React.useRef<HTMLDivElement>(null);
  const rightTriangleParagraphRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  /**
   * @name changeScene
   * @description Start the loading animation
   * @param start The point where we want to start
   * @return {void}
   */
  const changeScene = (color: string, href: string): void => {
    const scene = document.getElementsByClassName("scene")[0] as HTMLDivElement;
    scene.style.backgroundColor = color;
    scene.classList.add("scene-animate");
    scene.addEventListener("animationend", () => {
      router.push(href);
    });
  };

  /**
   * Calcule les coordonnées barycentriques d'un point par rapport à un triangle donné.
   *
   * @param p - Les coordonnées du point.
   * @param u - Les coordonnées du premier sommet du triangle.
   * @param v - Les coordonnées du deuxième sommet du triangle.
   * @param w - Les coordonnées du troisième sommet du triangle.
   * @returns Les coordonnées barycentriques du point par rapport au triangle.
   */
  const calculateBarycentricCoordinates = (
    p: { x: number; y: number },
    u: { x: number; y: number },
    v: { x: number; y: number },
    w: { x: number; y: number }
  ) => {
    const denominator = (v.y - w.y) * (u.x - w.x) + (w.x - v.x) * (u.y - w.y);
    const alpha =
      ((v.y - w.y) * (p.x - w.x) + (w.x - v.x) * (p.y - w.y)) / denominator;
    const beta =
      ((w.y - u.y) * (p.x - w.x) + (u.x - w.x) * (p.y - w.y)) / denominator;
    const gamma = 1 - alpha - beta;

    return { alpha, beta, gamma };
  };

  /**
   * Vérifie si les coordonnées barycentriques sont à l'intérieur d'un triangle.
   *
   * @param alpha - Coordonnée barycentrique alpha.
   * @param beta - Coordonnée barycentrique beta.
   * @param gamma - Coordonnée barycentrique gamma.
   * @returns True si les coordonnées barycentriques sont à l'intérieur du triangle, sinon false.
   */
  const isBarycentricInsideTriangle = ({
    alpha,
    beta,
    gamma,
  }: {
    alpha: number;
    beta: number;
    gamma: number;
  }) => {
    // Ajoutez une marge d'erreur (par exemple, 0.01) pour traiter les approximations numériques
    const epsilon = 0.01;

    return (
      alpha >= -epsilon &&
      beta >= -epsilon &&
      gamma >= -epsilon &&
      alpha <= 1 + epsilon &&
      beta <= 1 + epsilon &&
      gamma <= 1 + epsilon
    );
  };

  /**
   * Efface le contenu du canvas.
   */
  const clearCanvas = () => {
    const canvasElement = canvas.current;
    if (canvasElement && canvasElement.getContext) {
      const ctx = canvasElement.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    }
  };

  /**
   * Efface le contenu du canvas et restaure la valeur initiale des zIndex de chaque triangle.
   */
  const restoreTrianglesToInitalState = () => {
    if (
      leftTriangleRef.current &&
      rightTriangleRef.current &&
      leftTriangleParagraphRef.current &&
      rightTriangleParagraphRef.current
    ) {
      clearCanvas();
      // Remet le zIndex des triangles à leur valeur initiale.
      leftTriangleRef.current.style.zIndex = "50";
      rightTriangleRef.current.style.zIndex = "50";

      // Remet le texte de chaque lien sur chaque triangle
      leftTriangleParagraphRef.current.innerHTML = links.left.text;
      rightTriangleParagraphRef.current.innerHTML = links.right.text;
    }
  };

  /**
   * Dessine un triangle sur le canvas avec les sommets spécifiés.
   *
   * @param u - Les coordonnées du premier sommet du triangle.
   * @param v - Les coordonnées du deuxième sommet du triangle.
   * @param w - Les coordonnées du troisième sommet du triangle.
   * @param triangle - Le triangle colorer.
   */
  const drawTriangle = (
    u: { x: number; y: number },
    v: { x: number; y: number },
    w: { x: number; y: number }
  ) => {
    clearCanvas();
    const canvasElement = canvas.current;
    const canvasDiv = document.getElementById(
      `canvas-div-${rowIndex}-${colIndex}`
    ) as HTMLDivElement | null;

    if (canvasDiv && canvasElement && canvasElement.getContext) {
      const ctx = canvasElement.getContext("2d");
      // Définir la taille du canvas explicitement
      canvasElement.width = canvasDiv?.clientWidth || 0;
      canvasElement.height = canvasDiv?.clientHeight || 0;
      if (ctx) {
        ctx.fillStyle = "rgba(71, 85, 105, 0.5)";
        ctx.beginPath();
        ctx.moveTo(u.x, u.y);
        ctx.lineTo(v.x, v.y);
        ctx.lineTo(w.x, w.y);
        ctx.stroke();
        ctx.closePath();
        // the fill color
        ctx.fill();
      }
    }
  };

  /**
   * Calcule les sommets des triangles en fonction des dimensions du conteneur et de la configuration inverse.
   *
   * @param domRect - Dimensions du conteneur.
   * @param reverseTriangles - Indique si les triangles doivent être inversés.
   * @returns Les sommets des triangles.
   */
  const getVertices = (domRect: DOMRect, reverseTriangles: boolean) => {
    if (!reverseTriangles) {
      return {
        rightTriangle: {
          u: { x: 0, y: 0 },
          v: { x: domRect.width, y: 0 },
          w: { x: domRect.width, y: domRect.height },
        },
        leftTriangle: {
          u: { x: 0, y: 0 },
          v: { x: 0, y: domRect.height },
          w: { x: domRect.width, y: domRect.height },
        },
      };
    }
    return {
      rightTriangle: {
        u: { x: domRect.width, y: 0 },
        v: { x: domRect.width, y: domRect.height },
        w: { x: 0, y: domRect.height },
      },
      leftTriangle: {
        u: { x: 0, y: 0 },
        v: { x: 0, y: domRect.height },
        w: { x: domRect.width, y: 0 },
      },
    };
  };

  /**
   * Modifie le texte que contient un triangle.
   *
   * @param triangle - Le triangle de gauche ou celui de droite.
   * @param content - Le type de contenu.
   */
  const changeTriangleContent = (
    triangle: "left" | "right",
    content: "text" | "description"
  ) => {
    // Vérifie l'existence des deux paragraphes
    if (leftTriangleParagraphRef.current && rightTriangleParagraphRef.current) {
      // Si on demande à changer le contenu du triangle de gauche
      if (triangle === "left") {
        const resetRightText =
          rightTriangleParagraphRef.current.textContent === links.right.text;

        leftTriangleParagraphRef.current.innerHTML = links.left[content];

        // Vérifie si on doit réinitialiser la valeur du texte du triangle de droite
        if (!resetRightText)
          rightTriangleParagraphRef.current.innerHTML = links.right.text;
        // Si on demande à changer le contenu du triangle de droite
      } else {
        const resetLeftText =
          leftTriangleParagraphRef.current.textContent === links.left.text;

        rightTriangleParagraphRef.current.innerHTML = links.right[content];

        // Vérifie si on doit réinitialiser la valeur du texte du triangle de gauche
        if (!resetLeftText)
          leftTriangleParagraphRef.current.innerHTML = links.left.text;
      }
    }
  };

  /**
   * Gère les événements de mouvement de la souris.
   *
   * @param event - Événement de mouvement de la souris.
   */
  const handleMouseMove = (event: MouseEvent) => {
    const ref = divRef.current;
    if (ref && leftTriangleRef.current && rightTriangleRef.current) {
      const myrect = ref.getBoundingClientRect();
      const mouseX = event.clientX - myrect.left;
      const mouseY = event.clientY - myrect.top;

      // Les sommets du triangle rouge
      const vertices = getVertices(myrect, reverse);

      // Les coordonnées barycentriques pour les deux triangles
      const barycentricRightTriangle = calculateBarycentricCoordinates(
        { x: mouseX, y: mouseY },
        vertices.rightTriangle.u,
        vertices.rightTriangle.v,
        vertices.rightTriangle.w
      );
      const barycentricLeftTriangle = calculateBarycentricCoordinates(
        { x: mouseX, y: mouseY },
        vertices.leftTriangle.u,
        vertices.leftTriangle.v,
        vertices.leftTriangle.w
      );

      // Vérifier si les coordonnées barycentriques sont dans la plage [0, 1] pour chaque triangle
      const isInsideRightTriangle = isBarycentricInsideTriangle(
        barycentricRightTriangle
      );
      const isInsideLeftTriangle = isBarycentricInsideTriangle(
        barycentricLeftTriangle
      );

      if (isInsideRightTriangle || isInsideLeftTriangle) {
        if (isInsideLeftTriangle) {
          // Rend le z-index du triangle de gauche supérieur à celui de gauche.
          leftTriangleRef.current.style.zIndex = "50";
          rightTriangleRef.current.style.zIndex = "40";
          changeTriangleContent("left", "description");
          drawTriangle(
            vertices.leftTriangle.u,
            vertices.leftTriangle.v,
            vertices.leftTriangle.w
          );
        }
        if (isInsideRightTriangle) {
          // Rend le z-index du triangle de droite supérieur à celui de gauche.
          leftTriangleRef.current.style.zIndex = "40";
          rightTriangleRef.current.style.zIndex = "50";
          changeTriangleContent("right", "description");
          drawTriangle(
            vertices.rightTriangle.u,
            vertices.rightTriangle.v,
            vertices.rightTriangle.w
          );
        }
      }
    }
  };

  // Fonction pour mettre à jour les triangles en cas de redimensionnement de la fenêtre
  const handleWindowResize = () => {
    const divElement = divRef.current;
    if (divElement) {
      // Mettez à jour les triangles en fonction de la nouvelle taille du conteneur
      fillCell(divElement);
    }
  };

  /**
   * Dessine un triangle sur le canvas avec les sommets spécifiés.
   *
   * @param ref - l'élement <div> correspondant à la case de la grille.
   */
  const fillCell = (ref: HTMLDivElement) => {
    const canvasElement = canvasMask.current;
    const canvasDiv = document.getElementById(
      `canvas-div-${rowIndex}-${colIndex}`
    ) as HTMLDivElement | null;

    const myrect = ref.getBoundingClientRect();
    const vertices = getVertices(myrect, reverse);

    if (canvasDiv && canvasElement && canvasElement.getContext) {
      const ctx = canvasElement.getContext("2d");
      // Définir la taille du canvas explicitement
      canvasElement.width = canvasDiv?.clientWidth || 0;
      canvasElement.height = canvasDiv?.clientHeight || 0;
      if (ctx) {
        // on remplit le premier triangle
        ctx.fillStyle = colors.left;
        ctx.beginPath();
        ctx.moveTo(vertices.leftTriangle.u.x, vertices.leftTriangle.u.y);
        ctx.lineTo(vertices.leftTriangle.v.x, vertices.leftTriangle.v.y);
        ctx.lineTo(vertices.leftTriangle.w.x, vertices.leftTriangle.w.y);
        ctx.stroke();
        ctx.closePath();
        // the fill color
        ctx.fill();

        // on remplit le deuxième triangle
        ctx.fillStyle = colors.right;
        ctx.beginPath();
        ctx.moveTo(vertices.rightTriangle.u.x, vertices.rightTriangle.u.y);
        ctx.lineTo(vertices.rightTriangle.v.x, vertices.rightTriangle.v.y);
        ctx.lineTo(vertices.rightTriangle.w.x, vertices.rightTriangle.w.y);
        ctx.stroke();
        ctx.closePath();
        // the fill color
        ctx.fill();
      }
    }
  };

  React.useEffect(() => {
    const divElement = divRef.current;

    if (divElement) {
      fillCell(divElement);
      divElement.addEventListener("mousemove", handleMouseMove);
      divElement.addEventListener("mouseleave", restoreTrianglesToInitalState);

      // Ajoutez l'écouteur d'événements de redimensionnement de la fenêtre
      window.addEventListener("resize", handleWindowResize);

      // Retirer l'event listener lorsque le composant est démonté
      return () => {
        divElement.removeEventListener("mousemove", handleMouseMove);
        divElement.removeEventListener(
          "mouseleave",
          restoreTrianglesToInitalState
        );

        // Retirez l'écouteur d'événements de redimensionnement de la fenêtre
        window.removeEventListener("resize", handleWindowResize);
      };
    }
  }, []); // Pas de dépendances, les écouteurs une seule fois au montage du composant

  return (
    <div ref={divRef} className="h-full overflow-hidden relative z-[99]">
      <div
        id={`canvas-div-${rowIndex}-${colIndex}`}
        className="absolute w-full h-full z-30"
      >
        <canvas ref={canvas} className="w-full z-10 absolute" />
        <canvas ref={canvasMask} className="w-full z-20" />
      </div>
      <TriangleLink
        containerRef={leftTriangleRef}
        paragraphRef={
          reverse ? leftTriangleParagraphRef : rightTriangleParagraphRef
        }
        onClick={() => changeScene(colors.left, links.left.href)}
        linkContainerClassName={`flex items-center justify-center w-2/5 h-1/4 absolute top-[20%] ${
          reverse ? "left-[10%]" : "right-[10%]"
        }`}
        text={reverse ? links.left.text : links.right.text}
      />
      <TriangleLink
        containerRef={rightTriangleRef}
        paragraphRef={
          reverse ? rightTriangleParagraphRef : leftTriangleParagraphRef
        }
        onClick={() => changeScene(colors.right, links.right.href)}
        linkContainerClassName={`flex items-center justify-center w-2/5 h-1/4 absolute bottom-[20%] ${
          reverse ? "right-[10%]" : "left-[10%]"
        }`}
        text={reverse ? links.right.text : links.left.text}
      />
    </div>
  );
};

export default DividedRectangle;
