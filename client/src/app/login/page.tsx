"use client";

import Head from "next/head";
import { useRouter } from "next/navigation"
import React, { useState } from "react";
import { Button, buttonVariants } from "../../components/ui/button";
import Spinner from "../_components/spinner";
import authApi from "../../api/auth";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

// As a reminder ==>
// email: trashisland@gmail.com 
// password: Coldvisions!
// username: bladeeD9

const Page = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRegistered, setIsRegistered] = useState<boolean>(true);
  const router = useRouter();
  const handleNavigation = () =>{
    router.push("./documents");
  }

  const handleLogin = async (email: string, password: string) => {
    const result = await authApi.loginUser(email, password);

    if (result.success) {
      console.log("Login successful:", result.msg);
      handleNavigation();
    } else {
      console.log("Login failed:", result.msg);
    }
  };

  const handleRegister = async (
    username: string,
    email: string,
    password: string,
  ) => {
    const result = await authApi.registerUser(username, email, password);

    if (result.success) {
      console.log("Registration successful:", result.msg);
      handleNavigation();
    } else {
      console.log("Registration failed:", result.msg);
    }
  };

  const toggleRegistration = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRegistered(!isRegistered);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(isRegistered){
      handleLogin(email, password);
    }else{
      handleRegister(username, email, password);
    }

    console.log("Successfully submitted form");
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
          href="https://prod.spline.design/oKwB-1S0SrIuN3cg/scene.splinecode"
          as="fetch"
          crossOrigin="anonymous"
        />
      </Head>
      <div className="flex justify-center items-center flex-col w-screen h-screen gap-6">
        <Spline
          className="absolute top-0 left-0 w-screen h-screen z-[-1]"
          scene="https://prod.spline.design/oKwB-1S0SrIuN3cg/scene.splinecode"
          onLoad={handleIsLoading}
        />

        {isLoading && <Spinner />}
        {isRegistered && (
          <h1 className="font-custom font-bold text-white text-4xl">Login</h1>
        )}
        {!isRegistered && (
          <h1
            className="font-custom font-bold text-white text-4xl"
            style={{ wordSpacing: "5px" }}
          >
            Sign Up
          </h1>
        )}

        {!isLoading && (
          <form
            onSubmit={handleSubmit}
            className="z-10 flex min-w-56 flex-col gap-6 items-center"
          >
            {!isRegistered && (
              <div className="flex-1">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-white font-custom"
                >
                  Username:
                </label>
                <input
                  type="username"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-1 p-2 block border border-gray-300 rounded-md shadow-sm text-black font-custom"
                />
              </div>
            )}
            <div className="flex-1">
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
                className="mt-1 p-2 block border border-gray-300 rounded-md shadow-sm text-black font-custom"
              />
            </div>

            <div className="flex-1">
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
                className="mt-1 p-2 block border border-gray-300 rounded-md shadow-sm text-black font-custom"
              />
            </div>
            <Button className="font-custom flex-auto w-52" variant="secondary">
              Submit
            </Button>
            {isRegistered && (
              <a
                href="#"
                onClick={toggleRegistration}
                className="cursor-pointer text-violet-500 text-sm hover:underline"
              >
                Not yet registered?
              </a>
            )}
            {!isRegistered && (
              <a
                href="#"
                onClick={toggleRegistration}
                className="cursor-pointer text-violet-500 text-sm hover:underline"
              >
                Already registered?
              </a>
            )}
          </form>
        )}
      </div>
    </>
  );
};

export default Page;
