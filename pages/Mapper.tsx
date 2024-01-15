"use client";

import * as React from "react";
import TriangleImageMap from "@/core/components/TriangleMap";
import Mapper from "@/core/components/Mapper";

const Home = () => {
  const [whiteMapPos, setWhiteMapPos] = React.useState({
    tlcorner: "",
    trcorner: "",
    blcorner: "",
    brcorner: "",
  });

  const [redMapPos, setRedMapPos] = React.useState({
    tlcorner: "",
    trcorner: "",
    blcorner: "",
    brcorner: "",
  });

  const [leftPos, setLeftPos] = React.useState<number[]>([]);
  const [rightPos, setRightPos] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const myrect = document
        .getElementById("myImage")
        ?.getBoundingClientRect();

      if (myrect) {
        const triangleWhitePos = {
          tlcorner: `${myrect.x}, ${myrect.y}`,
          trcorner: `${myrect.x + myrect.width}, ${myrect.y + myrect.height}`,
          blcorner: `${myrect.x}, ${myrect.y + myrect.height}`,
          brcorner: `${myrect.x + myrect.width}, ${myrect.y + myrect.height}`,
        };

        const triangleRedPos = {
          tlcorner: `${myrect.x}, ${myrect.y}`,
          trcorner: `${myrect.x + myrect.width}, ${myrect.y}`,
          blcorner: `${myrect.x}, ${myrect.y}`,
          brcorner: `${myrect.x + myrect.width}, ${myrect.y + myrect.height}`,
        };

        /* setRedMapPos(triangleRedPos);
        setWhiteMapPos(triangleWhitePos); */
        setLeftPos([
          myrect.x,
          myrect.y,
          myrect.x + myrect.width,
          myrect.y + myrect.height,
          myrect.x + myrect.width,
          myrect.y + myrect.height,
          myrect.x,
          myrect.y + myrect.height,
        ]);
        setRightPos([
          myrect.x,
          myrect.y,
          myrect.x + myrect.width,
          myrect.y,
          myrect.x + myrect.width,
          myrect.y + myrect.height,
          myrect.x,
          myrect.y,
        ]);
      }
    }
  }, []);

  return (
    <div className="h-screen bg-gray-600">
      <div className="lg:grid min-h-screen p-0 grid-rows-2 grid-flow-col gap-0 text-white">
        {/* <TriangleImageMap
          mapName="top-left"
          triangleLeft={whiteMapPos}
          triangleLRight={redMapPos}
        /> */}
        <Mapper
          width={500}
          mapName="myMap"
          triangleLeft={leftPos}
          triangleLRight={rightPos}
        />
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>

        {/* <TriangleImageMap
          mapName="bottom-left"
          rotateImage="scale-x-[-1]"
          triangleLeft={whiteMapPos}
          triangleLRight={redMapPos}
        />
        <TriangleImageMap
          mapName="top-right"
          rotateImage="scale-x-[-1]"
          triangleLeft={whiteMapPos}
          triangleLRight={redMapPos}
        />
        <TriangleImageMap
          mapName="bottom-right"
          triangleLeft={whiteMapPos}
          triangleLRight={redMapPos}
        /> */}
      </div>
    </div>
  );
};

export default Home;
