// Filter.jsx
import React, { useState } from "react";

const Filter = ({
  setSelectedColor,
  setSelectedSize,
  setSelectedPrice,
  setSelectedRating,
  setSortOption,
}) => {
  const colors = ["Red", "Blue", "Green", "Black", "White"];
  const sizes = ["S", "M", "L", "XL"];
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="w-64 p-4 bg-white shadow rounded space-y-6 sticky top-20 h-[80vh] overflow-y-auto">
      <h2 className="font-bold text-lg mb-2">Filters</h2>

      <div>
        <h3 className="font-semibold mb-1">Color</h3>
        {colors.map((color) => (
          <div key={color}>
            <input
              type="radio"
              name="color"
              id={color}
              onChange={() => setSelectedColor(color)}
            />
            <label htmlFor={color} className="ml-2">{color}</label>
          </div>
        ))}
        <button
          onClick={() => setSelectedColor(null)}
          className="mt-1 text-sm text-blue-500 hover:underline"
        >
          Clear Color
        </button>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Size</h3>
        {sizes.map((size) => (
          <div key={size}>
            <input
              type="radio"
              name="size"
              id={size}
              onChange={() => setSelectedSize(size)}
            />
            <label htmlFor={size} className="ml-2">{size}</label>
          </div>
        ))}
        <button
          onClick={() => setSelectedSize(null)}
          className="mt-1 text-sm text-blue-500 hover:underline"
        >
          Clear Size
        </button>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Price</h3>
        <input
          type="range"
          min="0"
          max="5000"
          onChange={(e) => setSelectedPrice(parseFloat(e.target.value))}
        />
      </div>

      <div>
        <h3 className="font-semibold mb-1">Rating</h3>
        {ratings.map((r) => (
          <div key={r}>
            <input
              type="radio"
              name="rating"
              id={`rating-${r}`}
              onChange={() => setSelectedRating(r)}
            />
            <label htmlFor={`rating-${r}`} className="ml-2">{r}★ & Up</label>
          </div>
        ))}
        <button
          onClick={() => setSelectedRating(null)}
          className="mt-1 text-sm text-blue-500 hover:underline"
        >
          Clear Rating
        </button>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Sort</h3>
        <select
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        >
          <option value="">Default</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="rating">Rating: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
