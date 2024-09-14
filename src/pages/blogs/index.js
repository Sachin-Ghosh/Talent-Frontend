import { Button } from '@/components/ui/button';
import Image from 'next/image'
import React, { useState } from 'react'
import { AiTwotoneLike } from "react-icons/ai";
import { TfiCommentAlt } from "react-icons/tfi";
import { useRouter } from 'next/router';
const Blogs = () => {
  const [showComments, setShowComments] = useState(false);
  const router=useRouter()
  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  return (
    <>
    <div className="flex flex-col gap-1 sm:m-6 m-1">
      <div className="flex justify-between">
      <h1 className="text-2xl font-semibold">Blogs</h1>
      <Button className="rounded-full bg-purple-700" onClick={()=>{router.push('/blogs/create-blog')}}>+ Create Post</Button>
      </div>
    <div className='rounded shadow-xl flex flex-col gap-2 p-2 border'>
      <div className="flex items-center">
        <Image className="w-auto h-7 sm:h-12" src="/assets/Nav-logo.png" alt="Logo" width={100} height={100}/>
        <div className="flex flex-col">
        <h1 className="font-semibold text-lg">John Doe</h1>
        <h1 className="font-semibold text-xs text-gray-600">Software Engineer</h1>
        </div>
      </div>
      <hr className='bg-gray-700 '/>
      <div className="w-full h-72 bg-gray-300">
        {/* <Image className="w-full max-h-72" src="/assets/Login.png" alt="Logo" width={500} height={500}/> */}
      </div>
      <div className="flex gap-2">
        <Button className="bg-transparent hover:bg-transparent shadow-none p-1 rounded-full active:bg-blue-300">
          <AiTwotoneLike color='blue' size={30} />
        </Button>
        <Button className="bg-transparent hover:bg-transparent shadow-none p-2 rounded-full" onClick={handleCommentClick}>
          <TfiCommentAlt color='black' size={30} />
        </Button>
      </div>
      {showComments && (
        <>
        <hr className='bg-gray-700 '/>
        <div className="mt-2 p-2 border rounded bg-gray-100">
          <h2 className="font-semibold">Comments</h2>
        </div>
          </>
      )}
    </div>
    </div>
    <div className='rounded shadow-xl flex flex-col gap-2 p-2 border sm:mx-6 sm:my-4 m-1'>
      <div className="flex items-center">
        <Image className="w-auto h-7 sm:h-12" src="/assets/Nav-logo.png" alt="Logo" width={100} height={100}/>
        <div className="flex flex-col">
        <h1 className="font-semibold text-lg">John Doe</h1>
        <h1 className="font-semibold text-xs text-gray-600">Software Engineer</h1>
        </div>
      </div>
      <hr className='bg-gray-700 '/>
      <div className="w-full h-72 bg-gray-300">
        {/* <Image className="w-full max-h-72" src="/assets/Login.png" alt="Logo" width={500} height={500}/> */}
      </div>
      <div className="flex gap-2">
        <Button className="bg-transparent hover:bg-transparent shadow-none p-1 rounded-full active:bg-blue-300">
          <AiTwotoneLike color='blue' size={30} />
        </Button>
        <Button className="bg-transparent hover:bg-transparent shadow-none p-2 rounded-full" onClick={handleCommentClick}>
          <TfiCommentAlt color='black' size={30} />
        </Button>
      </div>
      {showComments && (
        <>
        <hr className='bg-gray-700 '/>
        <div className="mt-2 p-2 border rounded bg-gray-100">
          <h2 className="font-semibold">Comments</h2>
        </div>
          </>
      )}
    </div>
    </>
  )
}

export default Blogs