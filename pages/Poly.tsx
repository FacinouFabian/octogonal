import TriangleMap from "@/core/components/TriangleMap";

const Home = () => (
  <div className="h-screen bg-gray-600">
    <div className="lg:grid min-h-screen p-0 grid-rows-2 grid-flow-col gap-0 text-white">
      <TriangleMap
        colors={{ left: "rgb(168 85 247)", right: "rgb(99 102 241)" }}
        rowIndex={0}
        colIndex={0}
      />
      <TriangleMap
        colors={{ left: "rgb(59 130 246)", right: "rgb(34 197 94)" }}
        rowIndex={1}
        colIndex={0}
        reverse
      />
      <TriangleMap
        colors={{ left: "rgb(236 72 153)", right: "rgb(239 68 68)" }}
        rowIndex={0}
        colIndex={1}
        reverse
      />
      <TriangleMap
        colors={{ left: "rgb(254 240 138)", right: "rgb(251 146 60)" }}
        rowIndex={1}
        colIndex={1}
      />
    </div>
  </div>
);

export default Home;
