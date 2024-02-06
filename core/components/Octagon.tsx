import * as React from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import { useRouter } from "next/router";

interface Params {
  type?: string;
  from?: string;
}

interface Props {
  params: Params;
}

const Octagon: React.FunctionComponent<Props> = ({ params }): JSX.Element => {
  const router = useRouter();
  return (
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
        layout="fill"
        objectFit="contain"
        priority
        className="w-full h-full relative"
        src="/images/octagon.svg"
        alt="octagon"
      />
      {
        <span className="absolute text-2xl font-semibold text-white">
          {router.pathname !== "/learn-more" ? (
            <Link
              href={{
                pathname: "/learn-more",
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
          ) : (
            "Octogonal"
          )}
        </span>
      }
    </div>
  );
};

export default Octagon;
