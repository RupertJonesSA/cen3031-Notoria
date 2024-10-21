"use client";

import Spline from "@splinetool/react-spline";
import { useState } from "react";
import Head from "next/head";
import { Suspense } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
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
      <div className="bg-black w-screen h-screen">
        <Spline
          className="w-screen h-screen fixed"
          scene="https://draft.spline.design/T7tCI0NsyUBMwcXM/scene.splinecode"
        />

        <form
          onSubmit={handleSubmit}
          className="fixed top-48 left-[525px] max-w-md mx-auto p-4"
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
              className="mt-1 p-2 block w-fill border border-gray-300 rounded-md shadow-sm text-black font-custom"
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
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm text-black font-custom"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-violet-950 text-white p-2 rounded-md hover:bg-purple-300 font-custom"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Page;
