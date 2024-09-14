// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import Link from 'next/link';
// import React from 'react';
// import { useState } from 'react';


// const Login = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/create-account', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       // Handle successful response (e.g., redirect or show a message)
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className='flex flex-col items-center justify-center min-h-screen'>
//       <div className="flex justify-end w-[60rem] h-[36rem]  max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl bg-[url(/assets/Login.png)] bg-center bg-cover">
       
//         <div className=" w-full px-6 py-2 rounded-xl md:px-8 lg:w-1/2 backdrop-blur-md m-4 z-100 border border-white">
//           <div className="flex justify-center">
//             <Image className="w-auto h-7 sm:h-20" src="/assets/Nav-logo.png" alt="Logo" width={100} height={100}/>
//           </div>

//           <p className=" text-2xl text-center font-extrabold text-blue-800">
//             RecruitNest
//           </p>

//           {/* <a href="#" className="flex items-center justify-center mt-4 text-white transition-colors duration-300 transform border rounded-lg  ">
//             <div className="px-4 py-2">
//               <svg className="w-6 h-6" viewBox="0 0 40 40">
//                 <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
//                 <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
//                 <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
//                 <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
//               </svg>
//             </div>

//             <span className="w-5/6 px-4 py-3 font-bold text-center">Sign in with Google</span>
//           </a> */}

//           <div className="flex items-center justify-between">
//             <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

//             <p className="mt-1 text-xl text-center font-semibold text-black">
//             Welcome back!
//           </p>
//             {/* <a href="#" className="text-xs text-center text-white uppercase font-semibold hover:underline">or login with email</a> */}

//             <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
//           </div>

//           <form onSubmit={handleSubmit}>
//           <div className="mt-4">
//             <label className="block mb-2 text-sm font-medium text-black " htmlFor="username">Username</label>
//             <input id="username" name="username" value={formData.username} onChange={handleChange} className="block w-full px-4 py-2 text-white bg-transparent border rounded-lg focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" />
//           </div>
//           <div className="mt-4">
//             <label className="block mb-2 text-sm font-medium text-black" htmlFor="email">Email Address</label>
//             <input id="email" name="email" value={formData.email} onChange={handleChange} className="block w-full px-4 py-2 text-white bg-transparent border rounded-lg focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email" />
//           </div>

//           <div className="mt-4">
//             <div className="flex justify-between">
//               <label className="block mb-2 text-sm font-medium text-black" htmlFor="password">Password</label>
//               <a href="#" className="text-xs text-black hover:underline">Forget Password?</a>
//             </div>

//             <input id="password" name="password" value={formData.password} onChange={handleChange} className="block w-full px-4 py-2 text-white bg-transparent border rounded-lg focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" />
//           </div>

//           <div className="mt-6">
//             <input type='submit' placeholder='Sign In' value="Sign In" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-lg hover:bg-blue-300 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"/>
//           </div>
//           </form>
//           <div className="flex gap-4 mx-4 my-2 items-center">
//             <h1 className="text-black">Don{"'"}t have a account?</h1>
//             <span><Link href="/create-account" className="text-md text-gray-700 hover:underline font-semibold">Create One !</Link></span>
//           </div>
          
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter for redirection

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'candidate' // Default role
  });

  const router = useRouter(); // Initialize useRouter

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://talent-backend-wfqd.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('No user found, please sign up first');
      }

      const data = await response.json();
      // Redirect to the dashboard on successful login
      router.push('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-cover bg-center' style={{ backgroundImage: "url('/assets/Login.png')" }}>
      <div className="flex flex-col items-center justify-center w-full h-full bg-white bg-opacity-70 p-8 rounded-lg shadow-lg">
        <div className="flex justify-center">
          <Image className="w-auto h-20 mb-4" src="/assets/Nav-logo.png" alt="Logo" width={100} height={100} />
        </div>

        <p className="text-3xl text-center font-extrabold text-blue-800 mb-6">
          RecruitNest
        </p>

        <p className="text-xl text-center font-semibold text-black mb-4">
          Welcome back!
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-black" htmlFor="username">Username</label>
            <input id="username" name="username" value={formData.username} onChange={handleChange} className="block w-full px-4 py-2 text-black bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-black" htmlFor="email">Email Address</label>
            <input id="email" name="email" value={formData.email} onChange={handleChange} className="block w-full px-4 py-2 text-black bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-black" htmlFor="password">Password</label>
            <input id="password" name="password" value={formData.password} onChange={handleChange} className="block w-full px-4 py-2 text-black bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-black" htmlFor="role">Role</label>
            <select id="role" name="role" value={formData.role} onChange={handleChange} className="block w-full px-4 py-2 text-black bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300">
              <option value="candidate">Candidate</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <div className="mt-6">
            <input type='submit' placeholder='Login' value="Login" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-lg hover:bg-blue-300 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50" />
          </div>
        </form>
        <div className="flex gap-2 mt-4 items-center">
          <h1 className="text-black">Don{"'"}t have an account?</h1>
          <Link href="/create-account" className="text-md text-gray-700 hover:underline font-semibold">Create One!</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
