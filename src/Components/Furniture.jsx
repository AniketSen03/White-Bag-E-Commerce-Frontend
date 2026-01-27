import React, { useContext, useState } from 'react';
import collection from '../Components/data';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Filter from "./Filter";
import { usercontext } from '../App';

const Furniture = () => {
  const navigate = useNavigate();
  const { user, addToCart } = useContext(usercontext);
  const items = collection[4]; // furniture index
  const location = useLocation();
  const showFilter = location.pathname === "/men-clothes";

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [sortOption, setSortOption] = useState("");

  let filteredItems = items
    .filter((item) =>
      selectedColor ? item.color?.toLowerCase() === selectedColor.toLowerCase() : true
    )
    .filter((item) =>
      selectedSize ? item.size.includes(selectedSize) : true
    )
    .filter((item) =>
      selectedPrice ? parseFloat(item.price.replace(/[^\d.]/g, "")) <= selectedPrice : true
    )
    .filter((item) =>
      selectedRating ? item.rating >= selectedRating : true
    );

  if (sortOption === "low") {
    filteredItems.sort((a, b) => parseFloat(a.price.replace(/[^\d.]/g, "")) - parseFloat(b.price.replace(/[^\d.]/g, "")));
  } else if (sortOption === "high") {
    filteredItems.sort((a, b) => parseFloat(b.price.replace(/[^\d.]/g, "")) - parseFloat(a.price.replace(/[^\d.]/g, "")));
  } else if (sortOption === "rating") {
    filteredItems.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="flex gap-6 px-4 py-8">
      {showFilter && (
        <Filter
          setSelectedColor={setSelectedColor}
          setSelectedSize={setSelectedSize}
          setSelectedPrice={setSelectedPrice}
          setSelectedRating={setSelectedRating}
          setSortOption={setSortOption}
        />
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 flex-1">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            <Link to={`/furniture/${item.id}`}>
              <img
                src={item.image}
                alt={item.title}
                className="h-56 w-full object-cover"
              />
            </Link>

            <div className="p-4 flex flex-col flex-grow">
              <h2 className="font-semibold text-base mb-1 line-clamp-1">
                {item.title}
              </h2>

              <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                {item.description}
              </p>

              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-green-600">
                  {item.price}
                </span>
                <span className="text-sm text-orange-400 font-semibold">
                  {item.rating}★
                </span>
              </div>

              <div className="mt-auto flex gap-2">
                <button
                  onClick={() => {
                    if (!user) {
                      alert("Please login first");
                      navigate("/login");
                      return;
                    }
                    addToCart(item);
                  }}
                  className="flex-1 py-2 bg-black text-white text-sm rounded hover:opacity-90 border border-black hover:bg-white hover:text-black transition-all duration-200 ease-linear"
                >
                  Add
                </button>

                <Link
                  to={`/buy/furniture/${item.id}`}
                  state={{
                    type: "single",
                    product: { ...item, quantity: 1 }
                  }}
                  className="flex-1 py-2 border border-black text-black text-sm rounded text-center hover:bg-black hover:text-white transition-all duration-200 ease-linear"
                >
                  Buy
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Furniture;
