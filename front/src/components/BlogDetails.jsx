// BlogDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Comments from './comment';
import Summarize from './Summarize';
import { FaThumbsUp } from 'react-icons/fa';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const currentUser = localStorage.getItem('userId');

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  const fetchBlogDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`);
      if (!response.ok) throw new Error('Failed to fetch blog');
      const data = await response.json();
      setBlog(data);
      setLiked(data.liked || false);
      setLikeCount(data.likes);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId: currentUser })
      });
      if (!response.ok) throw new Error('Failed to like/unlike');

      const data = await response.json();
      setLikeCount(data.likes);
      setLiked(data.liked);
    } catch (error) {
      setError(error.message);
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

            <div className="flex items-center gap-2 mt-4">
              <button
                className={`text-sm ${liked ? 'text-blue-500' : 'text-gray-400'} hover:text-blue-600`}
                onClick={handleLike}
              >
                {liked ? <FaThumbsUp className='text-blue-600 hover:size-6'/> : <FaThumbsUp className='hover:size-6' />}
              </button>
              <span className="text-gray-400">{likeCount}</span>
                <p className="text-gray-400">{blog.tags}</p>
                
            </div>

            <Summarize text={blog.content} />
            <div className="mt-8">
              <Comments postId={id} />
            </div>
          </div>
        ) : (
          <div className="text-red-500">Post not found</div>
        )}
      </div>
    </>
  );
};

export default BlogDetails;
