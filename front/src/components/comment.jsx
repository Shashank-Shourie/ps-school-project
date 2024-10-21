import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);  // Initialize as an empty array
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Added loading state

    // Fetch comments when the component mounts or postId changes
    useEffect(() => {
        fetchComments();
    }, [postId]);

    const fetchComments = async () => {
        setLoading(true); // Set loading to true while fetching
        try {
            const response = await axios.get(`http://localhost:5000/api/posts/${postId}/comment`);
            if (Array.isArray(response.data)) {
                setComments(response.data);  // Ensure the response is an array
            } else {
                setComments([]);  // If it's not an array, set it to an empty array
            }
        } catch (err) {
            console.error("Error fetching comments: ", err);  // Log any errors
            setError(err.response?.data?.error || 'Failed to load comments');
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    // Handle posting a new comment
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');  // Assuming the token is stored here
            if (!token) {
                setError('User is not authenticated. Please log in.');
                return;
            }

            await axios.post(
                `http://localhost:5000/api/posts/${postId}/comment`, 
                { content: newComment },
                { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } }
            );

            // Fetch comments again to get the latest data
            await fetchComments();  // Call fetchComments to update the comment list
            setNewComment('');  // Clear the input
        } catch (err) {
            console.error("Error posting comment: ", err.response || err);
            setError(err.response?.data?.error || 'Failed to post comment');
        }
    };

    return (
        <div className="mt-6">
            <h3 className="text-white font-semibold mb-4">Comments:</h3>
            {error && <p className="text-red-500">{error}</p>}
            {loading ? (
                <p className="text-gray-500">Loading comments...</p>
            ) : (
                <ul className="space-y-4">
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <li key={comment._id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                                <strong className="text-blue-400">{comment.author.username}</strong>
                                <p className="text-gray-300 mt-1">{comment.content}</p>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                    )}
                </ul>
            )}
            <form onSubmit={handleSubmit} className="mt-4">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment"
                    required
                    className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Comments;
