import * as React from "react";

import Welcome from "@/pages/Welcome";

import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <h4 className="text-xl">
        <Welcome />
      </h4>
    </div>
  );
};

export default Home;
