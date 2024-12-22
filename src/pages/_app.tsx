import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { NextPage } from "next";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

import { TooltipProvider } from "@/components/ui/tooltip";
// import { ProfileProvider } from "@/context/ProfileContext";
import { cn } from "@/utils/shadcn";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <link rel="icon" href="" type="image/svg" />
        <title>Profile Page</title>
        <meta
          name="description"
          content="Integrated Smart Solutions  or Modern Students, Optimizing Learning and Productivity with Cutting-edge Technology."
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <div className={cn("min-h-screen bg-background font-sans antialiased")}>
        <TooltipProvider>
          {getLayout(<Component {...pageProps} />)}
        </TooltipProvider>
      </div>
      <Toaster />
    </>
  );
}

export default App;
