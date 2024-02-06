import Image from "next/legacy/image";
import projects from "@/data/projects";

interface Project {
  title: string;
  src: string;
  color: string;
}

const List = () => {
  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-center">
        <a className="relative w-24 h-24" href="https://www.google.com">
          <span className="absolute inset-0 octo-text-sm text-xs text-white">
            Octogonal
          </span>
          <Image width={0} height={0} src="/images/octagon.svg" alt="octagon" />
        </a>
      </div>
      <ul className="bg-red-900 border-t-2 border-black">
        {projects.map((project: Project): JSX.Element => {
          return (
            <li
              key={project.title}
              className={`w-full h-full p-4 flex items-center justify-center relative bg-${project.color}-500 border-b-2 border-black`}
            >
              <a
                className="w-full h-full flex items-center justify-center"
                href="https://www.google.com"
              >
                <Image
                  width={0}
                  height={0}
                  className="w-20 h-20"
                  src={project.src}
                  alt={project.title}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
