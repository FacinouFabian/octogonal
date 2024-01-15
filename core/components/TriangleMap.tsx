import * as React from "react";
import Link from "next/link";

interface Props {
  reverse?: boolean;
  rowIndex: number;
  colIndex: number;
  colors: {
    left: string;
    right: string;
  };
}

/**
 * Composant TriangleMap.
 *
 * @remarks
 * Ce composant représente une carte avec des triangles interactifs.
 *
 * @param props - Propriétés du composant.
 * @returns Un élément React représentant le composant TriangleMap.
 */
const TriangleMap = (props: Props) => {
  const { reverse = false, rowIndex, colIndex, colors } = props;
  const divRef = React.useRef<HTMLDivElement>(null);
  const canvas = React.useRef<HTMLCanvasElement>(null);
  const canvasMask = React.useRef<HTMLCanvasElement>(null);

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
        ctx.fillStyle = "rgb(52 211 153)";
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
   * Gère les événements de mouvement de la souris.
   *
   * @param event - Événement de mouvement de la souris.
   */
  const handleMouseMove = (event: MouseEvent) => {
    const ref = divRef.current;
    if (ref) {
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
        if (isInsideRightTriangle) {
          drawTriangle(
            vertices.rightTriangle.u,
            vertices.rightTriangle.v,
            vertices.rightTriangle.w
          );
        }
        if (isInsideLeftTriangle) {
          drawTriangle(
            vertices.leftTriangle.u,
            vertices.leftTriangle.v,
            vertices.leftTriangle.w
          );
        }
      }
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
      divElement.addEventListener("mouseleave", clearCanvas);

      // Retirer l'event listener lorsque le composant est démonté
      return () => {
        divElement.removeEventListener("mousemove", handleMouseMove);
        divElement.removeEventListener("mouseleave", clearCanvas);
      };
    }
  }, []); // Pas de dépendances, car nous ajoutons les écouteurs une seule fois au montage du composant

  return (
    <div ref={divRef} className="h-full overflow-hidden relative z-100 border">
      <div
        id={`canvas-div-${rowIndex}-${colIndex}`}
        className="absolute w-full h-full z-30"
      >
        <canvas ref={canvas} className="w-full z-10 absolute" />
        <canvas ref={canvasMask} className="w-full z-20" />
      </div>
      <div
        className={`absolute top-[35%] ${
          reverse ? "left-[25%]" : "right-[25%]"
        } z-50`}
      >
        <Link href="/Home">test</Link>
      </div>
      <div
        className={`absolute bottom-[35%] ${
          reverse ? "right-[25%]" : "left-[25%]"
        } z-50`}
      >
        <Link href="/Home">test</Link>
      </div>
    </div>
  );
};

export default TriangleMap;
