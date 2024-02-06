import Image from "next/legacy/image";

const Hero = (params: any): JSX.Element => {
  const data = params.props.hero;
  const titleArray = data.text.title.split("|");
  const schoolsImages = data.images.schools;
  const colors = params.props.colors;

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="block absolute inset-y-0 h-full w-full">
          <div className="relative h-full">
            <svg
              className="absolute right-full transform translate-y-1/3 translate-x-1/4 md:translate-y-1/2 sm:translate-x-1/2 lg:translate-x-full"
              width="404"
              height="784"
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="e229dbec-10e9-49ee-8ec3-0286ca089edf"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    className="text-gray-200"
                    fill="currentColor"
                  ></rect>
                </pattern>
              </defs>
              <rect
                width="404"
                height="784"
                fill="url(#ad9a0a02-b58e-4a1d-8c36-1b649889af63)"
              ></rect>
            </svg>
            <svg
              className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4"
              width="404"
              height="784"
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="d2a68204-c383-44b1-b99f-42ccff4e5365"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    className="text-gray-200"
                    fill="currentColor"
                  ></rect>
                </pattern>
              </defs>
              <rect
                width="404"
                height="784"
                fill="url(#478e97d6-90df-4a89-8d63-30fdbb3c7e57)"
              ></rect>
            </svg>
          </div>
        </div>

        <div className="relative pb-12 lg:pb-20">
          <div className="mt-10 mx-auto max-w-screen-xl px-4 sm:px-6 md:mt-16 lg:mt-20">
            <div className="text-center">
              <h2
                className={`text-4xl tracking-tight leading-10 font-extrabold text-${colors.title} sm:text-5xl sm:leading-none md:text-6xl`}
              >
                {titleArray[0]}
                <br />
                <span className={`text-${colors.inlineTitle}`}>
                  {titleArray[1]}
                </span>
              </h2>
              <p
                className={`}mt-3 max-w-md mx-auto text-base text-${colors.hero.text} sm:text-lg md:mt-5 md:text-xl md:max-w-3xl`}
              >
                {data.text.subtitle}
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex flex-col">
            <div className="flex-1"></div>
            <div className="flex-1 w-full bg-gray-800"></div>
          </div>
          <div className="relative w-full xl:h-[900px] lg:h-[600px] md:h-[400px] h-[300px] rounded-xl overflow-hidden mx-auto px-4 sm:px-6">
            <Image
              layout="fill"
              objectFit="contain"
              className="shadow-lg"
              src={data.images.hero}
              alt={data.name}
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-800">
        <div className="max-w-screen-xl mx-auto pt-16 pb-20 px-4 sm:px-6 md:pb-24 lg:px-8">
          <h3 className="text-center text-gray-400 text-sm font-semibold uppercase tracking-wide">
            {data.text.schools}
          </h3>
          <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
            {schoolsImages.map((school: any) => (
              <div
                key={school.alt}
                className="relative h-12 col-span-1 flex justify-center md:col-span-2 lg:col-span-1"
              >
                <Image
                  layout="fill"
                  objectFit="contain"
                  src={school.src}
                  alt={school.alt}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
