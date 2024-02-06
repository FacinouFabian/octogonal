const CTA = (params: any) => {
  const colors = params.props.colors.cta;

  return (
    <div className="bg-transparent">
      <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 md:py-16 lg:px-8 lg:py-20">
        <h2
          className={`text-3xl leading-9 font-extrabold tracking-tight text-${colors.title} sm:text-4xl sm:leading-10`}
        >
          Ready to dive in?
          <br />
          <span className={`text-${colors.subtitle}`}>
            Start your free trial today.
          </span>
        </h2>
        <div className="mt-8 flex">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className={`inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-${colors.buttonLeft.text} bg-${colors.buttonLeft.self} hover:bg-opacity-40 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out`}
            >
              Let&apos;s work together!
            </a>
          </div>
          <div className="ml-3 inline-flex">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-gray-200 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline focus:border-indigo-300 transition duration-150 ease-in-out"
            >
              More informations
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
