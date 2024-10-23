"use client";

import Head from "next/head";
import React, { useState } from "react";
import { Button, buttonVariants } from "../../components/ui/button";
import Spinner from "../_components/spinner";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleIsLoading = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
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
          href="https://draft.spline.design/T7tCI0NsyUBMwcXM/scene.splinecode"
          as="fetch"
          crossOrigin="anonymous"
        />
      </Head>
      <div>
        <Spline
          className="absolute top-0 left-0 w-screen h-screen z-[-1]"
          scene="https://draft.spline.design/T7tCI0NsyUBMwcXM/scene.splinecode"
          onLoad={handleIsLoading}
        />

        {isLoading && (
         <Spinner /> 
        )}

        {!isLoading && (
          <form
            onSubmit={handleSubmit}
            className="absolute z-10 top-[30vh] left-[42vw] p-4"
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white font-custom"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 p-2 block border border-gray-300 rounded-md shadow-sm text-black font-custom w-[14vw]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white font-custom"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 p-2 block border border-gray-300 rounded-md shadow-sm text-black font-custom w-[14vw]"
              />
            </div>
            <Button
              className="font-custom w-[14vw] h-[5vh]"
              variant="secondary"
            >
              Submit
            </Button>
          </form>
        )}
      </div>
    </>
  );
};

export default Page;
