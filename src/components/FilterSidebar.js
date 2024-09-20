import React, { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel, FormGroup, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './FilterSidebar.css'; 

const FilterSidebar = ({ filters, setFilters }) => {
  const [others, setOthers] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isPriceValid, setIsPriceValid] = useState(false);

  const categories = ['Plants', 'Seeds', 'Bulbs', 'Planters'];
  const otherSubcategories = ['Tools', 'Fertilizers', 'Accessories'];

  // Handle checkbox changes for main categories
  const handleCategoryChange = (category) => {
    setFilters((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Handle dropdown changes for "Others" subcategories
  const handleOtherChange = (event) => {
    const value = event.target.value;
    setOthers(value);
    setFilters((prev) => ({
      ...prev,
      Others: value,
    }));
  };

  // Price input change handlers
  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  // Handle Set Price button click
  const handleSetPrice = () => {
    setFilters((prev) => ({
      ...prev,
      priceRange: {
        min: parseFloat(minPrice),
        max: parseFloat(maxPrice),
      },
    }));
  };

  // Enable/Disable "Set Price" button based on validity
  useEffect(() => {
    setIsPriceValid(minPrice !== '' && maxPrice !== '' && parseFloat(minPrice) >= 0 && parseFloat(maxPrice) >= 0);
  }, [minPrice, maxPrice]);

  // Save filter state to localStorage on mount
  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem('filters'));
    if (savedFilters) {
      setFilters(savedFilters);
      setOthers(savedFilters.Others || []);
      setMinPrice(savedFilters.priceRange?.min || '');
      setMaxPrice(savedFilters.priceRange?.max || '');
    }
  }, [setFilters]);

  // Save filters to localStorage on changes
  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(filters));
  }, [filters]);

  return (
    <div className="filter-sidebar">
      <div>
        <h3>Filters</h3>
      </div>
      <hr />
      <div className="filter-section categories">
        <h3>Categories</h3>
        <FormGroup>
          {categories.map((category) => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox
                  checked={filters[category] || false}
                  onChange={() => handleCategoryChange(category)}
                />
              }
              label={category}
            />
          ))}
        </FormGroup>

        {/* Others Dropdown */}
        <div className="others-dropdown">
          <h3>Others</h3>
          <FormControl fullWidth>
            <InputLabel>Subcategories</InputLabel>
            <Select
              multiple
              value={others}
              onChange={handleOtherChange}
              renderValue={(selected) => selected.join(', ')}
            >
              {otherSubcategories.map((subcategory) => (
                <MenuItem key={subcategory} value={subcategory}>
                  {subcategory}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <hr />

      <div className="filter-section price-range">
        <h3>Price Range</h3>
        <div className="price-range-inputs">
          <label>
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={handleMinPriceChange}
            />
          </label>
          <label>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </label>
        </div>
        <button
          className="set-price-btn"
          onClick={handleSetPrice}
          disabled={!isPriceValid}
        >
          Set Price
        </button>
      </div>
      <hr />

      <div className="filter-section rating">
        <h3>Rating</h3>
        <label>
          <input type="checkbox" /> ★★★★★
        </label>
      </div>
      <hr />
      
      <div className="get-offer-section">
        <h3>GET 30% OFF</h3>
        <p>Share your referral code and get discount!</p>
        <button>Share</button>
      </div>
    </div>
  );
};

export default FilterSidebar;