import React, { useState } from 'react';

const Summarize1 = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSummarize = async () => {
    setLoading(true); // Set loading to true before starting the request
    const response = await fetch('http://localhost:5000/api/ai/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    setSummary(data.summary);
    setLoading(false); // Set loading to false after getting response
  };

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-white">Summarize Text</h2>
      <textarea
        className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to summarize"
      />
      <button
        onClick={handleSummarize}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        disabled={loading} // Disable button while loading
      >
        {loading ? 'Summarizing...' : 'Summarize'}
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
          Summarizing your blog post...
        </div>
      )}

      {summary && !loading && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-white">Summary:</h3>
          <p className="mt-2 bg-gray-200 p-4 rounded-lg">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Summarize1;