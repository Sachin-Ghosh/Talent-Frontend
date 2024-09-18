import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const BlogDetail = () => {
  const router = useRouter();
  const { id: blogId } = router.query; // Get the dynamic blogId from the URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (!blogId) return;

    const fetchBlog = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}api/blogs/${blogId}`);
        if (!response.ok) throw new Error('Failed to fetch blog');
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center ">
        <Image src={blog.imageLink} alt={blog.title} width={600} height={400} style={{ borderWidth: 1 }} />
        <h1 className="text-3xl font-bold mt-8">{blog.title}</h1>
        <h2 className="text-xl text-gray-600 mt-4">{blog.author.name} - {blog.profession}</h2>
        <p className="mt-8 ml-20 mr-20">{blog.description}</p>
      </div>
    </div>
  );
};

export default BlogDetail;