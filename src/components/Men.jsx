import React, { useContext, useState } from "react";
import collection from "../Components/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Filter from "./Filter";
import { usercontext } from "../App";

const Men = () => {
  const { addToCart, user } = useContext(usercontext);
  const navigate = useNavigate();
  const location = useLocation();

  const items = collection[0]; // MEN DATA
  const showFilter = location.pathname === "/men-clothes";

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [sortOption, setSortOption] = useState("");

  let filteredItems = [...items]
    .filter(i =>
      selectedColor ? i.color?.toLowerCase() === selectedColor.toLowerCase() : true
    )
    .filter(i =>
      selectedSize ? i.size?.includes(selectedSize) : true
    )
    .filter(i =>
      selectedPrice
        ? Number(i.price.replace(/[^\d]/g, "")) <= selectedPrice
        : true
    )
    .filter(i =>
      selectedRating ? i.rating >= selectedRating : true
    );

  if (sortOption === "low") {
    filteredItems.sort(
      (a, b) =>
        Number(a.price.replace(/[^\d]/g, "")) -
        Number(b.price.replace(/[^\d]/g, ""))
    );
  }
  if (sortOption === "high") {
    filteredItems.sort(
      (a, b) =>
        Number(b.price.replace(/[^\d]/g, "")) -
        Number(a.price.replace(/[^\d]/g, ""))
    );
  }
  if (sortOption === "rating") {
    filteredItems.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* MOBILE FILTER */}
      {showFilter && (
        <div className="lg:hidden mb-4">
          <Filter
            setSelectedColor={setSelectedColor}
            setSelectedSize={setSelectedSize}
            setSelectedPrice={setSelectedPrice}
            setSelectedRating={setSelectedRating}
            setSortOption={setSortOption}
          />
        </div>
      )}

      <div className="lg:flex gap-6">
        {/* DESKTOP FILTER */}
        {showFilter && (
          <div className="hidden lg:block w-64 shrink-0">
            <Filter
              setSelectedColor={setSelectedColor}
              setSelectedSize={setSelectedSize}
              setSelectedPrice={setSelectedPrice}
              setSelectedRating={setSelectedRating}
              setSortOption={setSortOption}
            />
          </div>
        )}

        {/* PRODUCTS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 flex-1">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col"
            >
              <Link to={`/men/${item.id}`} className="relative">
                {/* STICKER */}
                {item.rating >= 4.0 && (
                  <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                    Bestseller
                  </span>
                )}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-48 w-full object-cover rounded-t"
                />
              </Link>

              <div className="p-3 flex flex-col flex-grow">
                <h2 className="font-semibold text-sm line-clamp-1">
                  {item.title}
                </h2>

                <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                  {item.description}
                </p>

                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-green-600 text-sm">
                    {item.price}
                  </span>
                  <span className="text-orange-500 text-xs font-semibold">
                    {item.rating}★
                  </span>
                </div>

                <div className="mt-auto flex gap-2 pt-3">
                  <button
                    onClick={() => {
                      if (!user) {
                        navigate("/login");
                        return;
                      }
                      addToCart(item);
                    }}
                    className="flex-1 bg-black text-white text-xs py-2 rounded"
                  >
                    Add
                  </button>

                  <Link
                    to={`/buy/men/${item.id}`}
                    state={{ type: "single", product: { ...item, quantity: 1 } }}
                    className="flex-1 border border-black text-black text-xs py-2 rounded text-center"
                  >
                    Buy
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Men;
