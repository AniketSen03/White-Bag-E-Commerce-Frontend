import React, { useState } from "react";

const Filter = ({
  setSelectedColor,
  setSelectedSize,
  setSelectedPrice,
  setSelectedRating,
  setSortOption,
}) => {
  const [open, setOpen] = useState(false);

  const colors = ["Black", "White", "Red", "Blue", "Green"];
  const sizes = ["S", "M", "L", "XL"];
  const ratings = [4, 3, 2, 1];

  return (
    <>
      {/* 🔥 MOBILE FILTER BUTTON */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setOpen(!open)}
          className="w-full border px-4 py-2 rounded bg-white flex justify-between items-center"
        >
          Filters
          <span>{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* 🔥 FILTER PANEL */}
      <aside
        className={`
          bg-white border border-gray-200 rounded-lg p-4
          lg:w-64 lg:sticky lg:top-24 lg:h-fit
          ${open ? "block" : "hidden"} lg:block
        `}
      >
        {/* Header */}
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">
          Filters
        </h2>

        {/* SORT */}
        <div className="mb-6">
          <p className="font-medium text-sm mb-2">Sort By</p>
          <select
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full border rounded px-2 py-1 text-sm"
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
          <p className="text-xs text-gray-500 mt-1">Under ₹5000</p>
        </div>

        {/* COLOR */}
        <div className="mb-6">
          <p className="font-medium text-sm mb-2">Color</p>
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
          <button
            onClick={() => setSelectedColor(null)}
            className="text-xs text-gray-500 mt-1"
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
                className="px-3 py-1 border rounded text-sm"
              >
                {size}
              </button>
            ))}
          </div>
          <button
            onClick={() => setSelectedSize(null)}
            className="text-xs text-gray-500 mt-1"
          >
            Clear
          </button>
        </div>

        {/* RATING */}
        <div>
          <p className="font-medium text-sm mb-2">Customer Rating</p>
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
          <button
            onClick={() => setSelectedRating(null)}
            className="text-xs text-gray-500 mt-1"
          >
            Clear
          </button>
        </div>
      </aside>
    </>
  );
};

export default Filter;
