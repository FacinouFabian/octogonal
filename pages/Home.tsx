import Octagon from "@/core/components/Octagon";
import DividedRectangle from "@/core/components/DividedRectangle";

const Home = () => (
  <div className="h-screen scenes">
    <div className="lg:grid min-h-screen p-0 grid-rows-2 grid-flow-col gap-0 text-white">
      <Octagon params={{ type: "home" }} />
      <DividedRectangle
        links={{
          left: {
            href: "/hello",
            text: "Hello",
            description: `Une très longue description pour la page sur laquelle vous
          souhaitez cliquer. Vous voyez ? elle est très longue.`,
          },
          right: {
            href: "/about",
            text: "About",
            description: `Une très longue description pour la page sur laquelle vous
          souhaitez cliquer. Vous voyez ? elle est très longue.`,
          },
        }}
        colors={{ left: "rgb(99 102 241)", right: "rgb(168 85 247)" }}
        rowIndex={0}
        colIndex={0}
      />
      <DividedRectangle
        links={{
          left: {
            href: "/hero",
            text: "Hero",
            description: `Une très longue description pour la page sur laquelle vous
          souhaitez cliquer. Vous voyez ? elle est très longue.`,
          },
          right: {
            href: "/features",
            text: "Features",
            description: `Une très longue description pour la page sur laquelle vous
          souhaitez cliquer. Vous voyez ? elle est très longue.`,
          },
        }}
        colors={{ left: "rgb(59 130 246)", right: "rgb(34 197 94)" }}
        rowIndex={1}
        colIndex={0}
        reverse
      />
      <DividedRectangle
        links={{
          left: {
            href: "/cta",
            text: "CTA",
            description: `Une très longue description pour la page sur laquelle vous
          souhaitez cliquer. Vous voyez ? elle est très longue.`,
          },
          right: {
            href: "/testimonials",
            text: "Testimonials",
            description: `Une très longue description pour la page sur laquelle vous
          souhaitez cliquer. Vous voyez ? elle est très longue.`,
          },
        }}
        colors={{ left: "rgb(236 72 153)", right: "rgb(239 68 68)" }}
        rowIndex={0}
        colIndex={1}
        reverse
      />
      <DividedRectangle
        links={{
          left: {
            href: "/threecolumns",
            text: "Threecolumns",
            description: `Une très longue description pour la page sur laquelle vous
          souhaitez cliquer. Vous voyez ? elle est très longue.`,
          },
          right: {
            href: "/contact",
            text: "Contact",
            description: `Une très longue description pour la page sur laquelle vous
          souhaitez cliquer. Vous voyez ? elle est très longue.`,
          },
        }}
        colors={{ left: "rgb(254 240 138)", right: "rgb(251 146 60)" }}
        rowIndex={1}
        colIndex={1}
      />
    </div>
    <div className="text-white scene"></div>
  </div>
);

export default Home;
