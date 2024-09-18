import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { AiTwotoneLike } from "react-icons/ai";
import { TfiCommentAlt } from "react-icons/tfi";
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";

import 'swiper/swiper-bundle.css'; // Import Swiper styles

// BlogPost Component
const BlogPost = ({ blog, showComments, onCommentClick }) => {
  const router = useRouter();

  // Function to handle redirection to the blog detail page
  const handleBlogClick = () => {
    router.push(`/blogs/${blog._id}`);  // Redirect to dynamic blog page with blog-id
  };

  return (
    <div className="rounded-lg shadow-xl flex flex-col gap-2 p-4 border w-full h-full" onClick={handleBlogClick}>
      <div className="flex items-center">
        <Image className="w-auto h-7 sm:h-12" src="/assets/Nav-logo.png" alt="Logo" width={100} height={100} />
        <div className="flex flex-col">
          <h1 className="font-semibold text-lg">{blog.author.name}</h1>
          <h1 className="font-semibold text-xs text-gray-600">{blog.profession}</h1>
        </div>
      </div>
      <div className='ml-6'>
        <h1 className="font-semibold text-xl">{blog.title}</h1>
      </div>
      <hr className="bg-gray-700" />
      <div className="w-full h-96 bg-gray-300">
        {/* Blog Image */}
        <Image src={blog.imageLink} alt={blog.title} width={400} height={300} />
      </div>
      <div className="flex gap-2 justify-around">
        <Button className="bg-transparent hover:bg-transparent shadow-none p-1 rounded-full active:bg-blue-300">
          <AiTwotoneLike color="blue" size={30} />
        </Button>
        <Button className="bg-transparent hover:bg-transparent shadow-none p-2 rounded-full" onClick={onCommentClick}>
          <TfiCommentAlt color="black" size={30} />
        </Button>
      </div>
      {showComments && (
        <>
          <hr className="bg-gray-700" />
          <div className="mt-2 p-2 border rounded bg-gray-100">
            <h2 className="font-semibold">Comments</h2>
          </div>
        </>
      )}
    </div>
  );
};

// Swiper options config
const swiperOptions = {
  autoplay: {
    delay: 5000,
  },
  modules: [Autoplay, Scrollbar, Navigation],
  slidesPerView: 3, // Adjust the number of slides per view
  spaceBetween: 20, // Space between slides to prevent overlapping
  slidesPerGroup: 3,
  loop: false,
  scrollbar: {
    el: ".products-carousel__scrollbar",
    draggable: true,
  },
  navigation: {
    nextEl: ".products-carousel__next",
    prevEl: ".products-carousel__prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1, // Adjust for smaller screens
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
};

const Blogs = () => {
  const [showComments, setShowComments] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}api/blogs/all`);
        if (!response.ok) throw new Error('Failed to fetch blogs');
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col gap-4 sm:m-6 m-1">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Blogs</h1>
        <Button className="rounded-full bg-purple-700 mr-20 h-14 w-36">
          <a href='/blogs/create-blog'>+ Create Post</a>
        </Button>
      </div>

      {/* Swiper for Blog Posts */}
      <Swiper
        style={{ maxWidth: "100vw", overflow: "hidden", width: "100%", marginTop: 20 }}
        className="swiper-container"
        {...swiperOptions}
      >
        {blogs.map((blog, index) => (
          <SwiperSlide key={index} className="p-4">
            <BlogPost blog={blog} showComments={showComments} onCommentClick={handleCommentClick} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Blogs;