import "@/styles/globals.css";
import "@/styles/animations.css";
import "@/styles/custom.css";
import "@/styles/index.css";
import "@/styles/masks.css";
import "@/styles/medias.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
