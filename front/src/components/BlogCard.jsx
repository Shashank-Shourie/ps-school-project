import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog, isOwner, startEdit, handleDelete, userId }) => {
  const [likes, setLikes] = useState(blog.likes || 0);
  const [liked, setLiked] = useState(blog.userLiked);

  const toggleLike = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${blog._id}/like`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });

      const data = await response.json();
      setLikes(data.likes);
      setLiked(data.liked);
    } catch (error) {
      console.error('Failed to toggle like', error);
    }
  };

  return (
    <div className="bg-gray-700 rounded-lg p-4 mb-4 shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <div>
          <Link to={`/posts/${blog._id}`}>
            <h3 className="text-xl text-white font-bold">{blog.title}</h3>
          </Link>
          <p className="text-gray-400 text-sm">
            By {blog.author?.username || 'Unknown'} • {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>
        {isOwner && (
          <div className="flex gap-2">
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              onClick={() => startEdit(blog)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => handleDelete(blog._id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <p className="text-gray-300">{blog.content}</p>
      <div className="flex items-center mt-2">
        <button
          className={`px-3 py-1 rounded ${liked ? 'bg-blue-500' : 'bg-gray-500'} text-white`}
          onClick={toggleLike}
        >
          {liked ? 'Unlike' : 'Like'}
        </button>
        <span className="ml-2 text-gray-400">{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
      </div>
    </div>
  );
};

export default BlogCard;
