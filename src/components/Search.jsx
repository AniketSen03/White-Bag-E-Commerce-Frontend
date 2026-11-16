import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import collection from "./data";

const Search = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState(query || "");

  // 🔥 update URL when typing
  useEffect(() => {
    setSearch(query || "");
  }, [query]);

  const allProducts = collection.flat();

  const results = allProducts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* 🔍 SEARCH INPUT */}
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          navigate(`/search/${e.target.value}`);
        }}
        placeholder="Search products..."
        className="w-full border px-4 py-2 mb-6 rounded"
      />

      {/* RESULTS */}
      {results.length === 0 ? (
        <p className="text-center text-gray-500">No products found 😕</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {results.map(item => (
            <div
              key={item.id}
              onClick={() => navigate(`/${item.category}/${item.id}`)}
              className="cursor-pointer bg-white p-4 shadow rounded hover:scale-105 transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-40 w-full object-cover"
              />
              <p className="mt-2 text-sm font-semibold">{item.title}</p>
              <p className="text-green-600 font-bold">₹{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
