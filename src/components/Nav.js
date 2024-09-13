"use client"

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { ModeToggle } from './mode-toggle';
import { IoIosMenu } from 'react-icons/io';
import { useRouter } from 'next/router';
const Nav = ({ toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router=useRouter();
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-transparent backdrop-blur-md z-50 border-b-2 border-blue-500">
        <div className="container px-6 mx-auto md:flex md:justify-center md:items-center">
      <Button className="bg-transparent active:ring active:rounded-full hover:border-2 hover:rounded-full hover:bg-transparent" onClick={toggleSidebar}>
            <IoIosMenu size={30} color='grey'/>
            </Button>
          <div className="flex ml-10 items-center justify-between">
            <Link href="/" className='flex items-center justify-center'>
              <Image className="" src="/assets/Nav-logo.png" alt="Logo" width={80} height={80}/>
              <h1 className="text-xl font-bold hidden md:block text-nowrap">RecruitNest</h1>
            </Link>
            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                <svg
                  className={`w-6 h-6 ${isOpen ? 'hidden' : 'block'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                </svg>

                <svg
                  className={`w-6 h-6 ${isOpen ? 'block' : 'hidden'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          {/* Mobile Menu open: "block", Menu closed: "hidden" */}
          <div
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0 md:flex md:items-center md:justify-end ${isOpen ? 'block' : 'hidden'}`}
          >
            <div className="bg-gradient-to-r from-blue-900 to-blue-300 md:flex justify-center items-center py-1 px-10 rounded-full hidden">
             <div className="flex flex-col justify-center -mx-4 md:flex-row md:mx-10 md:py-0">
              <Link href="#" className="px-2.5 text-white transition-colors duration-300 transform rounded-lg dark:text-gray-200 md:mx-2">Home</Link>
              <Link href="#" className="px-2.5 text-white transition-colors duration-300 transform rounded-lg dark:text-gray-200 md:mx-2">About</Link>
              <Link href="#" className="px-2.5 text-white transition-colors duration-300 transform rounded-lg dark:text-gray-200 md:mx-2">Contact</Link>
            </div>
            <div className='flex gap-2 justify-center items-center'>
            <div className="relative mt-4 md:mt-0">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-800" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </span>

              <input
                type="text"
                className="w-full py-2 pl-10 pr-4 text-black bg-transparent border rounded-lg  dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                placeholder="Search"
              />
            </div>
              <div className="">
                <Button className="bg-blue-800 text-white font-semibold hover:bg-blue-700" onClick={()=>{router.push('/Login')}}>Login</Button>
              </div>
              <ModeToggle/>
          </div>
          </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;