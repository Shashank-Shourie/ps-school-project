import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

const BlogDetails = () => {
  const { id } = useParams();  // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  const fetchBlogDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`);
      if (!response.ok) throw new Error('Failed to fetch blog');
      const data = await response.json();
      setBlog(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-800 p-6">
        {blog ? (
          <div className="max-w-4xl mx-auto bg-gray-700 p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl text-white font-bold mb-4">{blog.title}</h1>
            <p className="text-gray-400 text-sm mb-6">
              By {blog.author.username} • {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-300">{blog.content}</p>
          </div>
        ) : (
          <div className="text-red-500">Post not found</div>
        )}
      </div>
    </>
  );
};

export default BlogDetails;
  