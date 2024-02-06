import Image from "next/legacy/image";

const Contact = (params: any) => {
  const data = params.props.contact;
  const colors = params.props.colors.contact;

  return (
    <div className="relative bg-transparent overflow-hidden">
      <div className="hidden lg:block lg:absolute lg:inset-0">
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            layout="fill"
            objectFit="contain"
            className="h-56 w-full object-cover lg:absolute lg:h-full"
            src={data.images.form.src}
            alt={data.images.form.alt}
          />
        </div>
      </div>
      <div className="relative pt-12 pb-16 px-4 sm:pt-16 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2">
        <div className="lg:pr-8">
          <div className="max-w-md mx-auto sm:max-w-lg lg:mx-0">
            <h2
              className={`text-3xl text-${colors.title} leading-9 font-extrabold tracking-tight sm:text-4xl sm:leading-10`}
            >
              Let's work together
            </h2>
            <p
              className={`mt-4 text-lg leading-7 text-${colors.description} sm:mt-3`}
            >
              We’d love to hear from you! Send us a message using the form
              opposite, or email us. We’d love to hear from you! Send us a
              message using the form opposite, or email us.
            </p>
            <form
              action="#"
              method="POST"
              className="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
            >
              <div>
                <label
                  className={`block text-sm font-medium leading-5 text-${colors.labels}`}
                >
                  First name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="first_name"
                    className="form-input block w-full transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div>
                <label
                  className={`block text-sm font-medium leading-5 text-${colors.labels}`}
                >
                  Last name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="last_name"
                    className="form-input block w-full transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  className={`block text-sm font-medium leading-5 text-${colors.labels}`}
                >
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="email"
                    type="email"
                    className="form-input block w-full transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  className={`block text-sm font-medium leading-5 text-${colors.labels}`}
                >
                  Company
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="company"
                    className="form-input block w-full transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="flex justify-between">
                  <label
                    className={`block text-sm font-medium leading-5 text-${colors.labels}`}
                  >
                    Phone
                  </label>
                  <span className="text-sm leading-5 text-gray-200">
                    Optional
                  </span>
                </div>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="phone"
                    className="form-input block w-full transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div className="text-right sm:col-span-2">
                <span className="inline-flex rounded-md shadow-sm">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                  >
                    Submit
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
