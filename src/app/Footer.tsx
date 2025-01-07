"use client"
import React from 'react';

const Footer = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '20px',
      padding: '20px',
    }} className='flex flex-col justify-center items-center bg-blue-500 text-white min-h-[10vh]'>
      
      <h2 className='text-4xl mt-4'>Lets make Azeroth great again!</h2>
      <p>© 2025 The Huge</p>
      <p>Developed by StBorgar AKA Borgar Flaen Stensrud</p>


    </div>
  );
};

export default Footer;

