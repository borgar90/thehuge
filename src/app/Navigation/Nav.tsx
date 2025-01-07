"use client"
import React from 'react';
import Link from 'next/link';
import {ApplyToJoinButtonSmall} from "@/features/Apply/ApplyToJoinButton";
import {SignInButtonSmall} from '@/features/Auth/SigninButton';


const Nav = () => {
  return (
    <nav className='flex flex-row justify-between items-center w-screen p-3  px-10 bg-gray-800 text-white'>
      <ul className='flex flex-row gap-4 items-center'>
        <li className='mr-4'>
         <h1 className="text-2xl font-bold text-white">
          The Huge
        </h1>
        </li>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
      <ul className='flex flex-row  items-center gap-4'>
      <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
        <ApplyToJoinButtonSmall />
        </li>
        <li>
        <SignInButtonSmall />
        </li>
      </ul>
    </nav>
  );
}

export default Nav;