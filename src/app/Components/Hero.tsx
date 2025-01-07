"use client"
import React from 'react';
import ApplyToJoinButton from "@/features/Apply/ApplyToJoinButton";
import SignInButton from "@/features/Auth/SigninButton";

export const Miniprogress = () => {
  
  return (
        <div className='text-black text-center flex flex-col gap-1 m-4 fixed top-50 left-0 z-50 bg-black bg-opacity-50 p-2 rounded-lg'>
          
                <div className='flex flex-col bg-white bg-opacity-90 p-2 rounded-lg'>
                  <span>Mythic</span>
                  <span className=''><i className='text-red-500'>⛝</i> 3/8</span>
                </div>
                <div className='flex flex-col bg-white bg-opacity-90 p-2 rounded-lg'>
                  <span>Heroic</span>
                  <span>&#x2705; 100%</span>
                </div>
                <div className='flex flex-col bg-white bg-opacity-90 p-2 rounded-lg'>
                  <span>Normal</span>
                  <span>&#x2705; 100%</span>
                </div>
        </div>
        )
}

const Hero = () => {
  return (
    
     
      <div className="flex flex-col items-center gap-4 justify-center shadow-lg ">
        <Miniprogress />
        <div className="flex flex-row gap-0">
          
          <div className="z-2 absolute top-0 left-0 right-0 z-2 bg-gradient-to-b from-gray-800 to-transparent w-full h-full flex flex-row justify-center items-center " >
            
            <div className='flex flex-col justify-center items-center' >
              
            <h1 className="text-6xl sm:text-6xl font-bold text-center sm:text-left text-white">
              The Huge
            </h1>
            <p className="text-center sm:text-left text-white text-3xl">
              World of warcraft raiding guild
            </p>
            <div className="flex flex-row gap-0">
              <ApplyToJoinButton />
              <SignInButton />
            </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Hero;




