"use client";

import { useRouter } from "next/navigation";
import Head from "next/head";
import React, { useState } from 'react';

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
          <div className="absolute w-full h-full flex justify-center items-center bg-black z-10">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
          </div>
        )}

        {!isLoading && (
          <button
            onClick={handleNavigation}
            className="w-[18vw] h-[8vh] absolute right-[42vw] bottom-[48vh] z-10 rounded-lg transition ease-in-out delay-75 bg-white hover:bg-violet-950 duration-300 text-black hover:text-white"
          >
            <h1 className="font-custom text-xl">Get Started</h1>
          </button>
        )}
      </div>    
    </>
  );
};

export default Page;
