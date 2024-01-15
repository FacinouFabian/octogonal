import * as React from "react";
import ImageMapper from "react-img-mapper";

interface MapPositions {
  width: number;
  mapName: string;
  triangleLeft: number[];
  triangleLRight: number[];
}

const Mapper = (props: MapPositions) => {
  const { width, mapName, triangleLeft, triangleLRight } = props;
  const [hoveredArea, setHoveredArea] = React.useState(null);
  const ref = React.useRef<HTMLDivElement>();

  const IMAGE_URL = "https://i.stack.imgur.com/M2A8V.png";

  const enterArea = (area: any) => {
    setHoveredArea(area);
  };
  const leaveArea = (area: any) => {
    setHoveredArea(null);
  };

  const getTipPosition = (area: any) => {
    return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
  };

  return (
    <div id="tl" className="w-full h-full overflow-hidden relative bordered">
      <ImageMapper
        width={ref?.current?.offsetWidth}
        src={IMAGE_URL}
        map={{
          name: mapName,
          areas: [
            {
              shape: "poly",
              coords: [0, 0, 500, 332, 500, 332, 0, 332],
              strokeColor: "rgb(255, 99, 71)",
              fillColor: "yellow",
            },
            {
              shape: "poly",
              coords: [0, 0, 500, 0, 500, 332, 0, 0],
              strokeColor: "rgb(255, 99, 71)",
              fillColor: "yellow",
            },
          ],
        }}
        /* onMouseEnter={(area) => enterArea(area)}
        onMouseLeave={(area) => leaveArea(area)} */
      />
    </div>
  );
};

export default Mapper;
