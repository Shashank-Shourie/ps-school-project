import React, { useState } from 'react';

const Summarize = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');

  const handleSummarize = async () => {
    const response = await fetch('http://localhost:5000/api/ai/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    setSummary(data.summary);
  };

  return (
    <div>
      <h2>Summarize Text</h2>
      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Enter text to summarize" 
      />
      <button onClick={handleSummarize}>Summarize</button>
      {summary && <div><h3>Summary:</h3><p>{summary}</p></div>}
    </div>
  );
};

export default Summarize;
