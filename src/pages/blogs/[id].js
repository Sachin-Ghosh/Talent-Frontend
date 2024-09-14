import { useRouter } from 'next/router';
import Image from 'next/image';

const BlogDetail = () => {
  const router = useRouter();
  const { blogId } = router.query; // Get the dynamic blogId from the URL

  // Fetch the blog data based on the blogId
  // For simplicity, here's a mock blog object
  const blog = {
    id: blogId,
    title: `The Future of Recruitment: Strategies for Success in a Changing Workforce ${blogId}`,
    author: 'John Doe',
    role: 'Software Engineer',
    description: 'In today’s rapidly evolving business landscape, recruitment is no longer just about filling open positions—it’s about finding the right talent that will drive an organization forward. The future of recruitment demands a shift in strategies to accommodate changing workforce dynamics, emerging technologies, and evolving candidate expectations.Recruiters today face a complex job market where competition for top talent is fiercer than ever. To stand out, companies must adopt a more holistic approach to recruitment, focusing not only on qualifications but also on culture fit, diversity, and potential for growth.',
    image: '/path/to/blog-image.jpg',
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center ">
        <Image src={blog.image} alt={blog.title} width={600} height={400} style={{borderWidth:1}} />
        <h1 className="text-3xl font-bold mt-8" >{blog.title}</h1>
        <h2 className="text-xl text-gray-600 mt-4">{blog.author} - {blog.role}</h2>
        <p className="mt-8 ml-20 mr-20">{blog.description}</p>
      </div>
    </div>
  );
};

export default BlogDetail;
