import React, { useState, useRef, useEffect } from "react";

const NoteBox = () => {
  const getUserId = () => localStorage.getItem("userId");
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const boxRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [formData, setFormData] = useState({ text: "" });
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch the note data
  const fetchNote = async () => {
    console.log("Function is being called");
    try {
      const response = await fetch("http://localhost:5000/api/auth/notevalues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ author: getUserId() }),
      });
      const data = await response.json();
      if (response.ok) {
        setFormData({ text: data.text || "" });
      }
    } catch (error) {
      console.error("Error fetching note:", error);
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  };

  useEffect(() => {
    fetchNote();
  }, []); // Fetch note on component mount

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;

      // Use requestAnimationFrame for smooth updates
      if (animationFrameRef.current === null) {
        animationFrameRef.current = requestAnimationFrame(() => {
          setPosition({ x: newX, y: newY });
          animationFrameRef.current = null;
        });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    animationFrameRef.current = null; // Clear any pending animation frame
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Send updated note to the backend
    try {
      const response = await fetch("http://localhost:5000/api/auth/Notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: getUserId(),
          text: updatedFormData.text,
        }),
      });
      if (response.ok) {
        // Re-fetch the updated note data
        await fetchNote();
      } else {
        console.error("Failed to update note:", await response.json());
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return loading ? (
    <div>Loading...</div> // Show a loading message or spinner while fetching
  ) : (
    <div
      className={`absolute bg-yellow-300 shadow-lg rounded-lg transition-all duration-300 ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{
        left: position.x,
        top: position.y,
        width: isOpen ? "200px" : "50px",
        height: isOpen ? "150px" : "50px",
        padding: isOpen ? "10px" : "0",
        backgroundColor: isOpen ? "yellow" : "yellow",
      }}
      onMouseDown={handleMouseDown}
      ref={boxRef}
    >
      {isOpen ? (
        <div className="relative w-full h-full">
          <textarea
            name="text"
            placeholder="Write your note here..."
            value={formData.text}
            onChange={handleChange}
            className="w-full h-full bg-yellow border-none outline-none resize-none text-sm text-gray-800"
          />
          <button
            onClick={toggleOpen}
            className="absolute top-1 right-1 text-gray-600 hover:text-gray-800 text-lg"
          >
            ✖
          </button>
        </div>
      ) : (
        <button
          onClick={toggleOpen}
          className="w-full h-full flex items-center justify-center text-xl"
        >
          📝
        </button>
      )}
    </div>
  );
};

export default NoteBox;
