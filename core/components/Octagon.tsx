import { FunctionComponent } from "react";
import Link from "next/link";
import Image from "next/image";

interface Params {
  type?: string;
  from?: string;
}

interface Props {
  params: Params;
}

const Octagon: FunctionComponent<Props> = ({ params }): JSX.Element => (
  <>
    <div
      className={`hidden md:flex lg:flex xl:flex items-center justify-center m-auto absolute inset-0 z-100 w-64 h-64
        ${
          params.type === "home"
            ? "octagonHome"
            : params.type === "learn" && params.from === "home"
            ? "octagonFromHome"
            : params.type === "learn" && params.from === "slug"
            ? "octagonFromSlug"
            : "octagonSlug"
        }
    `}
    >
      <Image
        width={0}
        height={0}
        className="w-full h-full relative"
        src="/images/octagon.svg"
        alt="octagon"
      />
      <span className="absolute text-2xl font-semibold text-white">
        <Link
          href={{
            pathname: "/LearnMore",
            query: {
              from:
                params.type === "home"
                  ? "home"
                  : params.type === "slug"
                  ? "slug"
                  : "",
            },
          }}
        >
          Octogonal
        </Link>
      </span>
    </div>
  </>
);

export default Octagon;
