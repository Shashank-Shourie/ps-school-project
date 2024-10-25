import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BlogForm from './BlogForm'; // Assuming BlogForm is in a separate file

const Display = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState('myBlogs');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  // Get token and userId from localStorage
  const token = localStorage.getItem('token');
  const currentUser = localStorage.getItem('userId');

  // Redirect to signup if not logged in
  useEffect(() => {
    if (!token) {
      navigate('/signup');
    }
  }, [token, navigate]);

  // Fetch all blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts');
      if (!response.ok) throw new Error('Failed to fetch blogs');
      const data = await response.json();
      setBlogs(data);
      setLoading(false); // Stop the loader after fetching data
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId
        ? `http://localhost:5000/api/posts/${editingId}`
        : 'http://localhost:5000/api/posts';

      const method = editingId ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Add token to headers
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save blog');

      // Fetch the latest blogs again to "refresh" the list
      await fetchBlogs();

      setShowForm(false);
      setFormData({ title: '', content: '' });
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}` // Add token to headers
          }
        });
        if (!response.ok) throw new Error('Failed to delete blog');
        setBlogs(blogs.filter(blog => blog._id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const startEdit = (blog) => {
    setFormData({
      title: blog.title,
      content: blog.content
    });
    setEditingId(blog._id);
    setShowForm(true);
  };

  const cancelEdit = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ title: '', content: '' });
  };

  const filterBlogs = (blogs) => {
    if (!searchQuery) return blogs;
    return blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const BlogCard = ({ blog, isOwner }) => (
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
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      </div>
    );
  }

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Blog Dashboard</h1>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({ title: '', content: '' });
            }}
          >
            {showForm ? 'Cancel' : 'New Blog Post'}
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 rounded bg-gray-600 text-white mb-4"
          />
        </div>

        {showForm && (
          <BlogForm
            onSubmit={handleSubmit}
            editingId={editingId}
            formData={formData}
            setFormData={setFormData}
            cancelEdit={cancelEdit}
          />
        )}

        <div className="mb-6">
          <div className="flex gap-4 border-b border-gray-600">
            <button
              className={`py-2 px-4 ${activeTab === 'myBlogs'
                ? 'text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('myBlogs')}
            >
              My Blogs
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'allBlogs'
                ? 'text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('allBlogs')}
            >
              All Blogs
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {activeTab === 'myBlogs' ? (
            filterBlogs(blogs)
              .filter(blog => blog.author?._id === currentUser)
              .map(blog => (
                <BlogCard key={blog._id} blog={blog} isOwner={true} />
              ))
          ) : (
            filterBlogs(blogs).map(blog => (
              <BlogCard
                key={blog._id}
                blog={blog}
                isOwner={blog.author?._id === currentUser}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Display;
