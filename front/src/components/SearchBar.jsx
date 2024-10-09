import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <div className="mb-6">
    <input
      type="text"
      placeholder="Search blogs..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full p-2 rounded bg-gray-600 text-white mb-4"
    />
  </div>
);

export default SearchBar;
