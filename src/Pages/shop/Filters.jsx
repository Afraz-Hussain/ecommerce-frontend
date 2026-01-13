// ===== Filters.jsx (FIXED) =====
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filters = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    minPrice: null,
    maxPrice: null,
    color: [],
    size: []
  });

  const brands = ['Nike', 'A4', 'place', 'ninja'];
  const colors = ['Red', 'Blue', 'Brown', 'Black'];
  const sizes = ['S', 'M', 'L', 'XL'];
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${process.env.VITE_API_URL}/backend/cate/allcats`);
        setCategories(res.data );
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId) => {
    const updated = filters.category.includes(categoryId)
      ? filters.category.filter(id => id !== categoryId)
      : [...filters.category, categoryId];
    
    const newFilters = { ...filters, category: updated };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleBrandChange = (brand) => {
    const updated = filters.brand.includes(brand)
      ? filters.brand.filter(b => b !== brand)
      : [...filters.brand, brand];
    
    const newFilters = { ...filters, brand: updated };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (min, max) => {
    const newFilters = { 
      ...filters, 
      minPrice: min || null, 
      maxPrice: max || null 
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleColorChange = (color) => {
    const updated = filters.color.includes(color)
      ? filters.color.filter(c => c !== color)
      : [...filters.color, color];
    
    const newFilters = { ...filters, color: updated };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSizeChange = (size) => {
    const updated = filters.size.includes(size)
      ? filters.size.filter(s => s !== size)
      : [...filters.size, size];
    
    const newFilters = { ...filters, size: updated };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: [],
      brand: [],
      minPrice: null,
      maxPrice: null,
      color: [],
      size: []
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="w-64 bg-white p-6 rounded-lg shadow-md h-fit sticky top-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat._id} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.category.includes(cat._id)}
                onChange={() => handleCategoryChange(cat._id)}
                className="mr-2 w-4 h-4"
              />
              <span className="text-sm">{cat.cateName}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Brand</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brand.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="mr-2 w-4 h-4"
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-3">
          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice || ''}
            onChange={(e) => handlePriceChange(e.target.value, filters.maxPrice)}
            className="w-full px-3 py-2 border rounded text-sm"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice || ''}
            onChange={(e) => handlePriceChange(filters.minPrice, e.target.value)}
            className="w-full px-3 py-2 border rounded text-sm"
          />
        </div>
      </div>

      {/* Colors */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Color</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorChange(color)}
              className={`px-3 py-1 text-sm rounded-full border ${
                filters.color.includes(color)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              className={`px-4 py-2 text-sm rounded border ${
                filters.size.includes(size)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;