import React, { useState, useEffect } from 'react';

const Summarize = ({ text }) => {  // Accept 'text' as a prop
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),  // Use the passed 'text' prop
      });
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Failed to summarize:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-700 p-1 rounded-lg shadow-lg mt-4">
      {/* <h2 className="text-2xl font-semibold mb-4 text-white">Summarize Blog</h2> */}
      <button
        onClick={handleSummarize}
        className="bg-blue-600 text-white py-2 px-2 rounded-md hover:bg-blue-700 transition duration-200"
        disabled={loading}
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
          Summarizing the blog...
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

export default Summarize;
