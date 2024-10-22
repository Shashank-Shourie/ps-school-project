import React, { useState } from 'react';

const GenerateBlog = () => {
  const [prompt, setPrompt] = useState('');
  const [blogPost, setBlogPost] = useState('');
  const [loading, setLoading] = useState(false);  // State to manage loading

  const handleGenerate = async () => {
    setLoading(true);  // Set loading to true when request starts
    const response = await fetch('http://localhost:5000/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    setBlogPost(data.blogPost);
    setLoading(false);  // Set loading to false when request ends
  };

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-white">Create a Blog Post</h2>
      <textarea
        className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt to generate a blog"
      />
      <button
        onClick={handleGenerate}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        disabled={loading}  // Disable button while loading
      >
        {loading ? 'Generating...' : 'Generate Blog'}
      </button>

      {loading && (
        <div className="mt-4 text-white">
          <svg
            className="animate-spin h-5 w-5 mr-3 inline-block"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Generating your blog post...
        </div>
      )}

      {blogPost && !loading && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-white">Generated Blog Post:</h3>
          <p className="mt-2 bg-gray-200 p-4 rounded-lg">{blogPost}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateBlog;