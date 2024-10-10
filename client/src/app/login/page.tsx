'use client'

import Spline from '@splinetool/react-spline/next';
import { useState } from 'react';

const Page = () =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e:any) => {
    e.preventDefault();
  } 

  return(
    <div className="bg-white w-screen h-screen">
      <Spline
        className="w-screen h-screen absolute"
        scene="https://prod.spline.design/oKwB-1S0SrIuN3cg/scene.splinecode" 
      />

      <form onSubmit={handleSubmit} className="absolute top-64 left-[690px] max-w-md mx-auto p-4">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-white font-custom">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-2 block w-fill border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-white font-custom">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className= "mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
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
  );
}

export default Page;
