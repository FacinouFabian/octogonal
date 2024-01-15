import Layout from "@/layouts/showcase";
import { Nav } from "@/components";
import {
  Hello,
  Hero,
  Features,
  CTA,
  Testimonials,
  ThreeColumns,
  Contact,
} from "@/core/anchors/about";
import { FunctionComponent } from "react";
import path from "path";
import fs from "fs";

const EducationTemplate: FunctionComponent = (params: any) => {
  return (
    <Layout title={`${params.name} | Octogonal`} colors={params.colors}>
      <Nav color={params.colors.navigation} data={{ type: "slug" }} />
      <Hello props={params} />
      <Hero props={params} />
      <Features props={params} />
      <CTA props={params} />
      <Testimonials props={params} />
      <ThreeColumns props={params} />
      <Contact props={params} />
    </Layout>
  );
};

export async function getStaticProps({ params }: any) {
  const commonDataFilePath = path.join(
    process.cwd(),
    "data",
    "common-data.json"
  );
  const slugColorsFilePath = path.join(
    process.cwd(),
    "data",
    "slugs",
    `${params.slug}.json`
  );

  const commonContent = JSON.parse(fs.readFileSync(commonDataFilePath, "utf8"));

  const colors = JSON.parse(fs.readFileSync(slugColorsFilePath, "utf8"));

  const pageProps = {
    ...commonContent,
    ...colors,
  };

  // By returning { props: posts }, the Blog component
  // will receive `fileContents` as a prop at build time
  return {
    props: {
      ...pageProps,
    },
  };
}

// This function gets called at build time
export async function getStaticPaths() {
  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: [
      { params: { slug: "about" } },
      { params: { slug: "contact" } },
      { params: { slug: "cta" } },
      { params: { slug: "features" } },
      { params: { slug: "hello" } },
      { params: { slug: "hero" } },
      { params: { slug: "testimonials" } },
      { params: { slug: "threecolumns" } },
    ],
    // Enable statically generating additional pages
    // For example: `http://localhost:3000/about` and `http://localhost:3000/hello`
    fallback: false,
  };
}

export default EducationTemplate;
