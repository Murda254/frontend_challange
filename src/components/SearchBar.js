import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onSort }) => {

  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '');  // Load from localStorage if available
  const [activeSort, setActiveSort] = useState('Relevance');

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);  // Update search state
    onSearch(term);  // Trigger search in parent component
    localStorage.setItem('searchTerm', term);  // Save search term in localStorage
  };

  const handleSortClick = (sortOption) => {
    setActiveSort(sortOption);
    onSort(sortOption);  // Trigger sorting in parent component
  };

  // Clear search term when user clears the input
  useEffect(() => {
    if (!searchTerm) {
      localStorage.removeItem('searchTerm');  // Remove from localStorage if empty
    }
  }, [searchTerm]);

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleInputChange}  // Trigger search instantly
      />

      <div className="sort-buttons">
        {['Relevance', 'Popular', 'Most New', 'Price'].map((option) => (
          <button
            key={option}
            className={`sort-button ${activeSort === option ? 'active' : ''}`}
            onClick={() => handleSortClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;