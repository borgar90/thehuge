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
    
     
      <div className="flex  gap-4 w-screen shadow-lg">
        <Miniprogress />   
          <div className="w-screen p-4 bg-gradient-to-b from-gray-800 to-transparent ">
            <div className='flex flex-col justify-center items-center py-10' >
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
    
  );
};

export default Hero;




