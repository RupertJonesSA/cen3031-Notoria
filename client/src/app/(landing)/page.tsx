"use client";

import { useRouter } from "next/navigation";
import Head from "next/head";
import React, { useState } from "react";
import { Button, ButtonVariants } from "../../components/ui/button";
import { ArrowRight } from "lucide-react";
import Spinner from "../_components/spinner";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

const Page = () => {
  const router = useRouter();
  const handleNavigation = () => {
    router.push("./login");
  };

  const [isLoading, setIsLoading] = useState(true);

  const handleSceneLoad = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  };

  return (
    <>
      <Head>
        <link
          rel="preconnect"
          href="https://prod.spline.design"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://draft.spline.design/5UoBCFUOm4z19NTS/scene.splinecode"
          as="fetch"
          crossOrigin="anonymous"
        />
      </Head>
      <div>
        <Spline
          className="absolute top-0 left-0 w-screen h-screen z-[-1]"
          scene="https://draft.spline.design/5UoBCFUOm4z19NTS/scene.splinecode"
          onLoad={handleSceneLoad}
        />

        {isLoading && (
          <Spinner />
        )}

        {!isLoading && (
          <>
            <Button
              onClick={handleNavigation}
              className="flex pl-5 pr-5 pt-8 pb-8 placeholder-red-600 absolute right-[42vw] bottom-[48vh] z-10 animate-bounce hover:animate-none"
              variant="ghost"
            >
              <h1 className="font-custom text-4xl md:text-3xl sm:text-2xl font-bold">
                Enter Notoria
              </h1>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default Page;
