import Image from "next/image";

const Hero = (params: any) => {
  const { name, hello } = params.props;
  return (
    <div className="w-full h-full py-3 px-4 flex flex-col justify-center items-center">
      <div className="w-1/2 h-1/2 flex flex-col justify-center items-center shadow-2xl relative">
        <Image
          width={1000}
          height={1000}
          className="rounded-lg"
          src={hello.image}
          alt={name}
        />
      </div>
    </div>
  );
};

export default Hero;
