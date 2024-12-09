import React, { useState, useRef, useEffect } from "react";

const NoteBox = () => {
  const getUserId = () => localStorage.getItem("userId");
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);
  const [formData, setFormData] = useState({ text: "" });
  const [loading, setLoading] = useState(true);

  const fetchNote = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/notevalues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: getUserId() }),
      });
      const data = await response.json();
      if (response.ok) {
        setFormData({ text: data.text || "" });
      }
    } catch (error) {
      console.error("Error fetching note:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  const startDrag = (clientX, clientY) => {
    setIsDragging(true);
    dragOffset.current = {
      x: clientX - position.x,
      y: clientY - position.y,
    };
  };

  const handleMouseMove = (clientX, clientY) => {
    if (isDragging) {
      const newX = clientX - dragOffset.current.x;
      const newY = clientY - dragOffset.current.y;
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(() => {
          setPosition({ x: newX, y: newY });
          animationFrameRef.current = null;
        });
      }
    }
  };

  const handleMouseDown = (e) => {
    if (e.target === e.currentTarget) {
      // Start dragging only if the event is on the container, not its children
      e.preventDefault();
      startDrag(e.clientX, e.clientY);
    }
  };

  const handleTouchStart = (e) => {
    if (e.target === e.currentTarget && e.touches.length === 1) {
      startDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleMouseMoveWrapper = (e) => handleMouseMove(e.clientX, e.clientY);
  const handleTouchMove = (e) => {
    if (e.touches.length === 1) {
      handleMouseMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleTouchEnd = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMoveWrapper);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    } else {
      document.removeEventListener("mousemove", handleMouseMoveWrapper);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMoveWrapper);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  const handleChange = async (e) => {
    e.stopPropagation(); // Prevent bubbling to parent draggable area
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    try {
      const response = await fetch("http://localhost:5000/api/auth/Notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: getUserId(), text: updatedFormData.text }),
      });
      if (!response.ok) {
        console.error("Failed to update note:", await response.json());
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div
      className={`fixed bg-yellow-300 shadow-lg rounded-lg transition-all duration-300 ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{
        left: position.x,
        top: position.y,
        width: isOpen ? "200px" : "50px",
        height: isOpen ? "150px" : "50px",
        padding: isOpen ? "10px" : "0",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {isOpen ? (
        <div className="relative w-full h-full">
          <textarea
            name="text"
            placeholder="Write your note here..."
            value={formData.text}
            onChange={handleChange}
            onMouseDown={(e) => e.stopPropagation()} // Prevent drag start
            onTouchStart={(e) => e.stopPropagation()} // Prevent drag start
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
