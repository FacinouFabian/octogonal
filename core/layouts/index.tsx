import * as React from "react";
import Head from "next/head";
import Footer from "@/core/components/Footer";

interface Colors {
  background: string;
  navigation: string;
  buttons: string;
  titles: string;
  footer: {
    bg: string;
    text: string;
    textHover: string;
  };
}

interface Props {
  children: React.ReactNode;
  title?: string;
  colors: Colors;
}

const Showcase: React.FunctionComponent<Props> = ({
  title,
  children,
  colors,
}) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        <title>{title || "Welcome"}</title>
      </Head>

      <main className={`w-full my-0 mx-auto block bg-${colors.background}`}>
        {children}
      </main>
      <Footer colors={colors.footer} />
    </>
  );
};

export default Showcase;
