

// import { useRouter } from 'next/router';
// import Image from 'next/image';
// import Link from 'next/link';
// import React, { useState } from 'react';

// const SignIn = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'candidate',
//   });

//   const router = useRouter(); 

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('https://talent-backend-wfqd.onrender.com/api/users/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       console.log('User signed in successfully:', data);

//       router.push('/dashboard'); 

//     } catch (error) {
//       console.error('Error:', error);
//       alert('Registration failed. Please try again.');
//     }
//   };

//   return (
//     <div className='flex flex-col items-center justify-center min-h-screen'>
//       <div className="flex justify-start w-[60rem] h-[36rem] max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl bg-[url(/assets/create-account.png)] bg-center bg-cover">
//         <div className="w-full px-6 py-2 rounded-xl md:px-8 lg:w-1/2 backdrop-blur-md m-4 z-100 border border-white">
//           <div className="flex justify-center">
//             <Image className="w-auto h-7 sm:h-20" src="/assets/Nav-logo.png" alt="Logo" width={100} height={100} />
//           </div>

//           <p className="text-2xl text-center font-extrabold text-blue-800">
//             RecruitNest
//           </p>

//           <div className="flex items-center justify-between">
//             <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
//             <p className="mt-1 text-xl text-center font-semibold text-black">
//               Get Started
//             </p>
//             <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div className="mt-4">
//               <label className="block mb-2 text-sm font-medium text-black" htmlFor="name">Name</label>
//               <input id="name" name="name" value={formData.name} onChange={handleChange} className="block w-full px-4 py-2 text-white bg-transparent border rounded-lg focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" />
//             </div>

//             <div className="mt-4">
//               <label className="block mb-2 text-sm font-medium text-black" htmlFor="email">Email Address</label>
//               <input id="email" name="email" value={formData.email} onChange={handleChange} className="block w-full px-4 py-2 text-white bg-transparent border rounded-lg focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email" />
//             </div>

//             <div className="mt-4">
//               <div className="flex justify-between">
//                 <label className="block mb-2 text-sm font-medium text-black" htmlFor="password">Password</label>
//                 <a href="#" className="text-xs text-black hover:underline">Forget Password?</a>
//               </div>

//               <input id="password" name="password" value={formData.password} onChange={handleChange} className="block w-full px-4 py-2 text-white bg-transparent border rounded-lg focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" />
//             </div>

//             <div className="mt-4">
//               <label className="block mb-2 text-sm font-medium text-black" htmlFor="role">Role</label>
//               <select id="role" name="role" value={formData.role} onChange={handleChange} className="block w-full px-4 py-2 text-white bg-transparent border rounded-lg focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300">
//                 <option value="candidate">Candidate</option>
//                 <option value="employee">Employee</option>
//               </select>
//             </div>

//             <div className="mt-6">
//               <input type='submit' placeholder='Sign In' value="Sign In" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-lg hover:bg-blue-300 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50" />
//             </div>
//           </form>

//           <div className="flex gap-4 mx-4 my-2 items-center">
//             <h1 className="text-black">Already have an account?</h1>
//             <span><Link href="/login" className="text-md text-gray-700 hover:underline font-semibold">Login To Account!</Link></span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignIn;

import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const SignIn = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'candidate',
  });

  const router = useRouter(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://talent-backend-wfqd.onrender.com/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('User signed in successfully:', data);

      router.push('/personal-info'); 

    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className="flex justify-center w-full h-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl bg-[url(/assets/create-account.png)] bg-center bg-cover">
        <div className="w-full px-6 py-2 rounded-xl md:px-8 lg:w-1/2 backdrop-blur-md m-4 border border-white bg-white">
          <div className="flex justify-center">
            <Image className="w-auto h-7 sm:h-20" src="/assets/Nav-logo.png" alt="Logo" width={100} height={100} />
          </div>

          <p className="text-2xl text-center font-extrabold text-blue-800">
            RecruitNest
          </p>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
            <p className="text-xl text-center font-semibold text-black">
              Get Started
            </p>
            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-black" htmlFor="name">Name</label>
              <input id="name" name="name" value={formData.name} onChange={handleChange} className="block w-full px-4 py-2 text-black bg-transparent border rounded-lg focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" />
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-black" htmlFor="email">Email Address</label>
              <input id="email" name="email" value={formData.email} onChange={handleChange} className="block w-full px-4 py-2 text-black bg-transparent border rounded-lg focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email" />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block mb-2 text-sm font-medium text-black" htmlFor="password">Password</label>
                <a href="#" className="text-xs text-black hover:underline">Forget Password?</a>
              </div>

              <input id="password" name="password" value={formData.password} onChange={handleChange} className="block w-full px-4 py-2 text-black bg-transparent border rounded-lg focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" />
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-black" htmlFor="role">Role</label>
              <select id="role" name="role" value={formData.role} onChange={handleChange} className="block w-full px-4 py-2 text-black bg-transparent border rounded-lg focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300">
                <option value="candidate">Candidate</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            <div className="mt-6">
              <input type='submit' placeholder='Sign In' value="Sign In" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-lg hover:bg-blue-300 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50" />
            </div>
          </form>

          <div className="flex gap-4 mx-4 my-2 items-center mt-4">
  <h1 className="text-black">Already have an account?</h1>
  <Link href="/Login" className="text-md text-gray-700 hover:underline font-semibold">
    Login To Account!
  </Link>
</div>

        </div>
      </div>
    </div>
  );
}

export default SignIn;
