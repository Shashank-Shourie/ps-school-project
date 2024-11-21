import React from 'react';

const BlogForm = ({ onSubmit, editingId, formData, setFormData, cancelEdit }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="bg-gray-700 p-4 rounded-lg mb-4">
      <div className="mb-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-600 text-white"
          required
        />
      </div>
      <div className="mb-4">
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-600 text-white h-32"
          required
        />
      </div>
      <div className="mb-4">
        <textarea
          name="tags"
          placeholder="Tags"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          className="w-full p-2 rounded bg-gray-600 text-white"
          required
        />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          {editingId ? 'Update Post' : 'Create Post'}
        </button>
        <button
          type="button"
          onClick={cancelEdit}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
