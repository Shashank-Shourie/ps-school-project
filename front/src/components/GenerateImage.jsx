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
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h2>Generate AI Image for Blog</h2>
            <textarea
                rows="4"
                cols="50"
                placeholder="Enter blog content to generate an image..."
                value={blogContent}
                onChange={(e) => setBlogContent(e.target.value)}
                style={{ marginBottom: '1rem', padding: '0.5rem' }}
            ></textarea>
            <br />
            <button
                onClick={handleGenerateImage}
                disabled={loading || !blogContent.trim()}
                style={{
                    padding: '0.5rem 1rem',
                    cursor: loading || !blogContent.trim() ? 'not-allowed' : 'pointer',
                    backgroundColor: loading ? '#ddd' : '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                }}
            >
                {loading ? 'Generating...' : 'Generate Image'}
            </button>
            {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
            {imageUrl && (
                <div style={{ marginTop: '2rem' }}>
                    <h3>Generated Image:</h3>
                    <img src={imageUrl} alt="Generated" style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }} />
                </div>
            )}
        </div>
    );
};

export default GenerateImage;
