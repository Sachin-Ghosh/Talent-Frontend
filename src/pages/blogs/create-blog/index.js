import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useAuth } from '@/context/AuthContext';

export default function CreateBlogPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState('');
  const { authUser, token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.API_URL}api/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          description,
          imageLink,
          userId: authUser._id
        })
      });
      if (!response.ok) throw new Error('Failed to create blog');
      const data = await response.json();
      console.log('Blog created:', data);
      router.push("/blogs")
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className=" mx-auto">
        <CardHeader>
          <div className='flex flex-row align-middle gap-x-96'>
            <CardTitle>Create a New Blog Post</CardTitle>
            <Button className='rounded-full w-1 text-white flex align-middle absolute right-16'>
              <a href='/blogs'> X</a>
            </Button>
          </div>
          <CardDescription>Fill in the details for your new blog post</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Post Title</Label>
              <Input
                id="title"
                placeholder="Enter your blog post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Write your blog post content here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="min-h-[200px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageLink">Upload Image Link</Label>
              <Input
                id="imageLink"
                placeholder="Enter Your Image Link"
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Create Post</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}