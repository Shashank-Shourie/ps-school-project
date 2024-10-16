import React, { useState } from 'react';

const GenerateBlog = () => {
  const [prompt, setPrompt] = useState('');
  const [blogPost, setBlogPost] = useState('');

  const handleGenerate = async () => {
    const response = await fetch('http://localhost:5000/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    setBlogPost(data.blogPost);
  };

  return (
    <div>
      <h2>Create a Blog Post</h2>
      <textarea 
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)} 
        placeholder="Enter a prompt to generate a blog" 
      />
      <button onClick={handleGenerate}>Generate Blog</button>
      {blogPost && <div><h3>Generated Blog Post:</h3><p>{blogPost}</p></div>}
    </div>
  );
};

export default GenerateBlog;
