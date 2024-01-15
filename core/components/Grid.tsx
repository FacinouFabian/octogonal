import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Octagon from "@/components/Octagon";
import List from "./List";

const Grid = (): JSX.Element => {
  const router = useRouter();
  /**
   * @name startLoadFrom
   * @description Start the loading animation
   * @param start The point where we want to start
   * @return {void}
   */
  const changeScene = (color: string, href: string): void => {
    const scene = document.getElementsByClassName("scene")[0] as HTMLDivElement;
    scene.classList.add(color, "scene-animate");
    scene.addEventListener("animationend", () => {
      router.push(`/${href}`);
    });
  };

  /**
   * @name fade
   * @description Add fade animation to the grid after 0,05 seconds (when the octogon's animation is almost finished)
   * @return {void}
   */
  const fade = (): void => {
    const el1 = document.getElementById("caseTopLeft");
    const el2 = document.getElementById("caseBottomLeft");
    const el3 = document.getElementById("caseTopRight");
    const el4 = document.getElementById("caseBottomRight");
    if (el1 != null && el2 != null && el3 != null && el4 != null) {
      setTimeout((): void => {
        el1.classList.add("fadeIn");
        el2.classList.add("fadeIn");
        el3.classList.add("fadeIn");
        el4.classList.add("fadeIn");
      }, 50);
    }
  };

  useEffect(() => {
    fade();
  });

  return (
    <div className="min-h-full">
      {/* SMALL SCREENS */}
      <List />

      {/* LARGE SCREENS */}
      <div
        id="grid"
        className="hidden lg:grid min-h-screen p-0 grid-rows-2 grid-flow-col gap-0 text-white"
      >
        <Octagon params={{ type: "home" }} />

        {/* 1 */}
        <div
          id="caseTopLeft"
          className="h-full overflow-hidden relative border-2 border-b-0 bordered invisible"
        >
          <div
            className={`flex items-center justify-center bg-indigo-500 hover:opacity-50 transform absolute triangleTopRight z-50 cursor-pointer overflow-hidden`}
            onClick={(): void => changeScene("bg-green-500", "hello")}
          >
            <div>
              <Image
                width={0}
                height={0}
                className="w-20 h-20 imageTopRight transform absolute left-0 right-0 bottom-0"
                src="/images/eso1907a.jpg"
                alt="Imgae"
              />
            </div>
          </div>
          <div
            className={`flex items-center border-2 justify-center bg-purple-500 hover:opacity-50 transform absolute triangleTopLeft z-50 cursor-pointer overflow-hidden bordered`}
            onClick={(): void => changeScene("bg-purple-500", "about")}
          >
            <span>
              <Image
                width={0}
                height={0}
                className="w-20 h-20 imageTopLeft transform absolute bottom-0 right-0"
                src="/images/eso1907a.jpg"
                alt="Imgae"
              />
            </span>
          </div>
        </div>

        {/* 3 */}
        <div
          id="caseBottomLeft"
          className="h-full overflow-hidden relative border-2 border-b-0 bordered invisible"
        >
          <div
            className={`flex items-start justify-center bg-blue-500 hover:opacity-50 transform triangleBottomLeft z-50 cursor-pointer overflow-hidden`}
            onClick={(): void => changeScene("bg-blue-500", "hero")}
          >
            <span>
              <Image
                width={0}
                height={0}
                className="w-20 h-20 imageBottomLeft transform absolute top-0 right-0 bottom-0"
                src="/images/eso1907a.jpg"
                alt="Imgae"
              />
            </span>
          </div>
          <div
            className={`flex items-end justify-center border-2 bg-green-500 hover:opacity-50 transform absolute triangleBottomRight z-50 cursor-pointer overflow-hidden bordered`}
            onClick={(): void => changeScene("bg-green-500", "features")}
          >
            <span>
              <Image
                width={0}
                height={0}
                className="w-20 h-20 imageBottomRight transform relative"
                src="/images/eso1907a.jpg"
                alt="Imgae"
              />
            </span>
          </div>
        </div>

        {/* 2 */}
        <div
          id="caseTopRight"
          className="h-full overflow-hidden relative border-2 border-b-0 bordered invisible"
        >
          <div
            className={`flex items-start justify-center bg-pink-500 hover:opacity-50 transform triangleBottomLeft z-50 cursor-pointer overflow-hidden`}
            onClick={(): void => changeScene("bg-pink-500", "cta")}
          >
            <span>
              <Image
                width={0}
                height={0}
                className="w-20 h-20 imageBottomLeft transform absolute top-0 right-0 bottom-0"
                src="/images/eso1907a.jpg"
                alt="Imgae"
              />
            </span>
          </div>

          <div
            className={`flex items-end justify-center border-2 bg-red-500 hover:opacity-50 transform absolute triangleBottomRight z-50 cursor-pointer overflow-hidden bordered `}
            onClick={(): void => changeScene("bg-red-500", "testimonials")}
          >
            <span>
              <Image
                width={0}
                height={0}
                className="w-20 h-20 imageBottomRight transform relative"
                src="/images/eso1907a.jpg"
                alt="Imgae"
              />
            </span>
          </div>
        </div>

        {/* 4 */}
        <div
          id="caseBottomRight"
          className="h-full overflow-hidden relative border-2 border-b-0 bordered invisible"
        >
          <div
            className={`flex items-center justify-center bg-yellow-200 hover:opacity-50 transform absolute triangleTopRight z-50 cursor-pointer overflow-hidden `}
            onClick={(): void => changeScene("bg-yellow-200", "threecolumns")}
          >
            <span>
              <Image
                width={0}
                height={0}
                className="w-20 h-20 imageTopRight transform absolute left-0 right-0 bottom-0"
                src="/images/eso1907a.jpg"
                alt="Imgae"
              />
            </span>
          </div>
          <div
            className={`flex items-center border-2 justify-center bg-orange-400 hover:opacity-50 transform absolute triangleTopLeft z-50 cursor-pointer overflow-hidden bordered`}
            onClick={(): void => changeScene("bg-orange-400", "contact")}
          >
            <span>
              <Image
                width={0}
                height={0}
                className="w-20 h-20 imageTopLeft transform absolute bottom-0 right-0"
                src="/images/eso1907a.jpg"
                alt="Imgae"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grid;
