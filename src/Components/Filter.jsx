// Filter.jsx
import React from "react";

const Filter = ({
  setSelectedColor,
  setSelectedSize,
  setSelectedPrice,
  setSelectedRating,
  setSortOption,
}) => {
  const colors = ["Black", "White", "Red", "Blue", "Green"];
  const sizes = ["S", "M", "L", "XL"];
  const ratings = [4, 3, 2, 1];

  return (
    <aside className="w-64 shrink-0 bg-white border border-gray-200 rounded-lg p-4 sticky top-24 h-fit">
      {/* Header */}
      <h2 className="text-lg font-semibold border-b pb-2 mb-4">
        Filters
      </h2>

      {/* SORT */}
      <div className="mb-6">
        <p className="font-medium text-sm mb-2">Sort By</p>
        <select
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-black"
        >
          <option value="">Relevance</option>
          <option value="low">Price — Low to High</option>
          <option value="high">Price — High to Low</option>
          <option value="rating">Rating — High to Low</option>
        </select>
      </div>

      {/* PRICE */}
      <div className="mb-6">
        <p className="font-medium text-sm mb-2">Price</p>
        <input
          type="range"
          min="0"
          max="5000"
          step="500"
          onChange={(e) => setSelectedPrice(Number(e.target.value))}
          className="w-full accent-black"
        />
        <p className="text-xs text-gray-500 mt-1">
          Under ₹5000
        </p>
      </div>

      {/* COLOR */}
      <div className="mb-6">
        <p className="font-medium text-sm mb-2">Color</p>
        <div className="space-y-1">
          {colors.map((color) => (
            <label
              key={color}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="radio"
                name="color"
                onChange={() => setSelectedColor(color)}
                className="accent-black"
              />
              {color}
            </label>
          ))}
        </div>
        <button
          onClick={() => setSelectedColor(null)}
          className="text-xs text-gray-500 mt-1 hover:text-black"
        >
          Clear
        </button>
      </div>

      {/* SIZE */}
      <div className="mb-6">
        <p className="font-medium text-sm mb-2">Size</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className="px-3 py-1 border border-gray-300 rounded text-sm hover:border-black"
            >
              {size}
            </button>
          ))}
        </div>
        <button
          onClick={() => setSelectedSize(null)}
          className="text-xs text-gray-500 mt-1 hover:text-black"
        >
          Clear
        </button>
      </div>

      {/* RATING */}
      <div>
        <p className="font-medium text-sm mb-2">Customer Rating</p>
        <div className="space-y-1">
          {ratings.map((r) => (
            <label
              key={r}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="radio"
                name="rating"
                onChange={() => setSelectedRating(r)}
                className="accent-black"
              />
              {r}★ & above
            </label>
          ))}
        </div>
        <button
          onClick={() => setSelectedRating(null)}
          className="text-xs text-gray-500 mt-1 hover:text-black"
        >
          Clear
        </button>
      </div>
    </aside>
  );
};

export default Filter;
