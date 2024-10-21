"use client";

import Spline from "@splinetool/react-spline";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Suspense } from "react";

const Page = () => {
  const router = useRouter();
  const handleNavigation = () => {
    router.push("./login");
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
      <div className="bg-black min-h-screen">
        <Suspense fallback={<div>Loading...</div>}>
          <Spline
            className="w-screen h-screen fixed"
            scene="https://draft.spline.design/5UoBCFUOm4z19NTS/scene.splinecode"
          />
        </Suspense>
        <button
          onClick={handleNavigation}
          className="w-64 h-14 bg-white fixed right-12 bottom-32 rounded-lg"
        >
          <h1 className="text-black font-custom text-xl">Get Started</h1>
        </button>
      </div>
    </>
  );
};

export default Page;
