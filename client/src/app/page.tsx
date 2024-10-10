'use client'

import Spline from "@splinetool/react-spline";
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const handleNavigation = () =>{
    router.push('./login');
  }

  return (
    <div className="bg-white min-h-screen">
      <Spline
        className="absolute w-screen h-screen"
        scene="https://prod.spline.design/RMkBnRtpqsLeb0oO/scene.splinecode"
      />
      <button onClick ={handleNavigation} className="w-64 h-14 bg-white absolute right-72 bottom-52 rounded-lg">
        <h1 className="text-black font-custom text-xl">Login/Sign Up</h1>
      </button>
    </div>
  );
};

export default Page;
