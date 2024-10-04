// import React, { useState, useEffect, useRef } from "react";
// import Image from 'next/image';
// import Link from 'next/link';
// import { Button } from './ui/button';
// import { ModeToggle } from './Mode-toggle';
// import { IoIosMenu } from 'react-icons/io';

// import { useAuth } from "@/context/AuthContext";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
// import { ModeToggle } from "./Mode-toggle";
import { IoIosMenu } from "react-icons/io";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { RxDashboard } from "react-icons/rx";
import { BriefcaseBusiness } from "lucide-react";
import { FaWpforms } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { RiBloggerFill } from "react-icons/ri";

import { PiUser } from "react-icons/pi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const router = useRouter();

  // useEffect(() => {
  //   // Check if the current route is '/test'
  //   const isTestPage = router.pathname === '/test';

  //   // If on the test page, hide the navbar and sidebar
  //   if (isTestPage) {
  //     setIsOpen(false); // Close the mobile menu if it's open
  //   }
  // }, [router.pathname]);

  // // Check if the current route is '/test'
  // const isTestPage = router.pathname === '/test';

  // // If on the test page, return null to hide the navbar and sidebar
  // if (isTestPage) {
  //   return null;
  // }

  const { token, logout, authUser } = useAuth();
  // const isAdmin = user && user.role === 'Admin'; // Check if the user is an admin
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Ref to the sidebar element
  const sidebarRef = useRef(null);

  // console.log("Token:", token); // Debug log
  // console.log("AuthUser:", authUser); // Debug log

  useEffect(() => {
    // console.log("Navbar rendered"); // Debug log
  }, []);

  // Close sidebar when a link is clicked
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Close sidebar when user clicks outside the sidebar
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarOpen(false);
    }
  };

  // Add event listener to handle clicks outside the sidebar
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  // if (!token) {
  //   console.log("No token, not rendering Navbar"); // Debug log
  //   return null;
  // }
  return (
    <>
      <div className="relative flex items-center px-9 top-0 left-0 right-0 bg-transparent backdrop-blur-md z-50 border-b-2 border-blue-500">
        {token && (
          <div>
           
              <IoIosMenu className="cursor-pointer" size={30} color="grey" onClick={toggleSidebar} />
            
            {/* Sidebar */}
            {sidebarOpen && (
              <div
                ref={sidebarRef}
                className={`dark:bg-slate-950 bg-white h-screen absolute  top-28 border-2 left-0 transform mr-12 ${
                  sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out w-72 z-10`}
              >
                <ul className=" flex flex-col gap-4 px-4 py-3">
                  {authUser?.role === "candidate" && ( // Render the report link only for admin users
                    <li>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 p-2 cursor-pointer bg-transparent text-black font-semibold shadow-none hover:bg-purple-700 hover:text-white rounded-md"
                        onClick={closeSidebar}
                      >
                        <RxDashboard size={20} />
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      href="/jobs"
                      className="flex items-center gap-3 p-2 cursor-pointer bg-transparent text-black font-semibold shadow-none hover:bg-purple-700 hover:text-white rounded-md"
                      onClick={closeSidebar}
                    >
                      <BriefcaseBusiness size={20} />
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/applied-jobs"
                      className="flex items-center gap-3 p-2 cursor-pointer bg-transparent text-black font-semibold shadow-none hover:bg-purple-700 hover:text-white rounded-md"
                      onClick={closeSidebar}
                    >
                      <FaWpforms size={20} />
                      Applied Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blogs"
                      className="flex items-center gap-3 p-2 cursor-pointer bg-transparent text-black font-semibold shadow-none hover:bg-purple-700 hover:text-white rounded-md"
                      onClick={closeSidebar}
                    >
                      <RiBloggerFill size={20} />
                      Blogs
                    </Link>
                  </li>
                  
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="container px-6 mx-auto md:flex md:justify-center md:items-center">
          <div className="flex ml-10 items-center justify-between">
            <Link
              href={
                token
                  ? authUser.role === "candidate"
                    ? "/dashboard"
                    : "/"
                  : "/ "
              }
              className="flex items-center justify-center"
            >
              <Image
                className=""
                src="/assets/Nav-logo.png"
                alt="Logo"
                width={80}
                height={80}
              />
              <h1 className="text-xl font-bold hidden md:block text-nowrap">
                RecruitNest
              </h1>
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
                  className={`w-6 h-6 ${isOpen ? "hidden" : "block"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>

                <svg
                  className={`w-6 h-6 ${isOpen ? "block" : "hidden"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Mobile Menu open: "block", Menu closed: "hidden" */}
          <div
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0 md:flex md:items-center md:justify-end ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <div className="bg-gradient-to-r from-blue-900 to-blue-300 md:flex justify-center items-center px-10 rounded-full hidden">
              {/* <div className="flex flex-col justify-center -mx-4 md:flex-row md:mx-10 md:py-0">
                <Link
                  href="/"
                  className="px-2.5 text-white transition-colors duration-300 transform rounded-lg dark:text-gray-200 md:mx-2"
                >
                  Home
                </Link>
                <Link
                  href="#"
                  className="px-2.5 text-white transition-colors duration-300 transform rounded-lg dark:text-gray-200 md:mx-2"
                >
                  About
                </Link>
                <Link
                  href="#"
                  className="px-2.5 text-white transition-colors duration-300 transform rounded-lg dark:text-gray-200 md:mx-2"
                >
                  Contact
                </Link>
              </div> */}
              <div className="flex gap-2 justify-center items-center">
                {/* <div className="relative mt-4 md:mt-0">
                  {/* <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-5 h-5 text-gray-800" viewBox="0 0 24 24" fill="none">
                      <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </span> */}

                {/* <input
                    type="text"
                    className="w-full py-2 pl-10 pr-4 text-black bg-transparent border rounded-lg  dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                    placeholder="Search"
                  /> */}
                {/* </div> */}
                {/* <div className="">
                  <Button className=" text-white font-semibold bg-red-600" onClick={() => { router.push('/create-account') }}>Logout</Button>
                </div> */}

                {/* <ModeToggle /> */}

                {!token && (
                  <li style={{ listStyleType: "none" }}>
                    <Link
                      href="/create-account"
                      style={{ display: "none" }}
                      className=" text-white font-semibold bg-red-600"
                    >
                      Sign Up
                    </Link>
                  </li>
                )}

                {!token && (
                  <div className="flex-none">
                    <Link
                      href="/login"
                      className="flex items-center btn btn-ghost normal-case text-xl text-primary"
                    >
                      <PiUser size={24} className="mr-2" />
                      Login
                    </Link>
                  </div>
                )}

                {token && (
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle avatar"
                      class
                    >
                    
                      <PiUser size={28} />
              
                    </div>
                    <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                     
                      <li>
                        <Link href="/profile">Profile</Link>
                      </li>
                     
                      <li>
                        <button onClick={logout}>Logout</button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
