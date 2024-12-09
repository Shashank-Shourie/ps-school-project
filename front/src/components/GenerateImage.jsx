import React, { useState } from 'react';

const GenerateImage = () => {
  const [blogContent, setBlogContent] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateImage = async () => {
    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const response = await fetch('http://localhost:5000/api/ai/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogContent }),
      });

      const data = await response.json();

      if (response.ok && data.imageUrl) {
        setImageUrl(data.imageUrl);
      } else {
        setError(data.error || 'Failed to generate image');
      }
    } catch (err) {
      setError('Error connecting to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-white">Generate AI Image for Blog</h2>
      <textarea
        className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={blogContent}
        onChange={(e) => setBlogContent(e.target.value)}
        placeholder="Enter blog content to generate an image..."
      />
      <button
        onClick={handleGenerateImage}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        disabled={loading || !blogContent.trim()}
      >
        {loading ? 'Generating...' : 'Generate Image'}
      </button>

      {error && (
        <div className="mt-4 text-red-500">
          {error}
        </div>
      )}

      {imageUrl && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-white">Generated Image:</h3>
          <img
            src={imageUrl}
            alt="Generated"
            className="mt-2 max-w-full h-auto rounded-lg"
          />
        </div>
      )}

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
          Generating your image...
        </div>
      )}
    </div>
  );
};

export default GenerateImage;
