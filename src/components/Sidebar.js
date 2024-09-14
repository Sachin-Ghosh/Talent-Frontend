// import React from 'react'
// import { RxDashboard } from "react-icons/rx";
// import { FiLayout } from "react-icons/fi";
// import { SiReacthookform } from "react-icons/si";
// import { BsBarChart } from "react-icons/bs";
// import { IoIosArrowForward } from "react-icons/io";
// import { FaTableCellsLarge } from "react-icons/fa6";
// import { IoMdContract } from "react-icons/io";
// import { FaRegUser } from "react-icons/fa";
// import { CiNoWaitingSign } from "react-icons/ci";
// import { TiDocumentText } from "react-icons/ti";
// import { FaBook } from "react-icons/fa";
// import { PiUsersThreeDuotone } from "react-icons/pi";
// import { BriefcaseBusiness } from 'lucide-react';
// import Link from 'next/link';
// const SideNavbar = ({ isOpen }) => {
//     const menu = [
//         {
//             id: 1,
//             name: 'Dashboard',
//             route: '',
//             icon: RxDashboard
//         },
//         {
//             id: 2,
//             name: 'Interview Preparations',
//             route: 'study-material',
//             icon: FaBook
//         },
//         {
//             id: 3,
//             name: 'Jobs',
//             route: 'jobs',
//             icon: BriefcaseBusiness
//         },
       
//     ];

//     return (
//         <aside className={`dark:bg-slate-950 bg-white h-screen absolute border-2 top-20 b order-2 left-0 transform ${
//             isOpen ? 'translate-x-0' : '-translate-x-full'
//         } transition-transform duration-300 ease-in-out w-72 z-10`}>
//             <div className="flex flex-col gap-4 px-4 py-3">
//                 {menu.map((item, index) => (
//                     <div key={item.id} className={`flex items-center gap-3 p-2 cursor-pointer ${index === 0 ? 'bg-blue-700 text-white' : 'hover:bg-blue-700 hover:text-white'} rounded-md font-semibold`}>
//                         <item.icon size={20} />
//                         <Link href={`/${item.route}`}>{item.name}</Link>
//                         <IoIosArrowForward className="ml-auto"/>
//                     </div>
//                 ))}
//             </div>
//         </aside>
//     )
// }

// export default SideNavbar

import React from 'react';
import { RxDashboard } from 'react-icons/rx';
import { FaBook } from 'react-icons/fa';
import { BriefcaseBusiness } from 'lucide-react';
import { IoIosArrowForward } from 'react-icons/io';
import { RiBloggerFill } from "react-icons/ri";
import { ImProfile } from "react-icons/im";
import Link from 'next/link';

const SideNavbar = ({ isOpen }) => {
    const menu = [
        {
            id: 1,
            name: 'Dashboard',
            route: '',
            icon: RxDashboard,
        },
        {
            id: 2,
            name: 'Interview Preparations',
            route: 'study-material',
            icon: FaBook,
        },
        {
            id: 3,
            name: 'Jobs',
            route: 'jobs', // Adjust route to lowercase
            icon: BriefcaseBusiness,
        },
        {
            id: 4,
            name: 'Profile',
            route: '/profile',
            icon: ImProfile
        },
        {
            id: 4,
            name: 'Blogs',
            route: '/blogs',
            icon: RiBloggerFill
        },
       
    ];

    return (
        <aside className={`dark:bg-slate-950 bg-white h-[90rem] absolute border-2 top-20 b order-2 left-0 transform mr-12 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out w-72 z-10`}>
            <div className="flex flex-col gap-4 px-4 py-3">
                {menu.map((item, index) => (
                    <div key={item.id} className={`flex items-center gap-3 p-2 cursor-pointer ${index === 0 ? 'bg-purple-700 text-white' : 'hover:bg-purple-700 hover:text-white'} rounded-md font-semibold`}>
                        <item.icon size={20} />
                        <Link href={`/${item.route}`}>{item.name}</Link>
                        <IoIosArrowForward className="ml-auto"/>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default SideNavbar;
