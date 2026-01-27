import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import collection from "./data";
import { usercontext } from "../App";

const Param = () => {
  const { addToCart, user } = useContext(usercontext);
  const { category, id } = useParams();
  const navigate = useNavigate();

  // 🔹 category ko index me convert karna
  const categoryIndex = {
    men: 0,
    women: 1,
    kids: 2,
    electronics: 3,
    furniture: 4,
  }[category];

  const items = collection[categoryIndex] || [];
  const product = items.find(p => Number(p.id) === Number(id));

  if (!product) {
    return <p className="text-center mt-20 text-xl">Product not found 😕</p>;
  }

  // 🔹 Recommendations (same category, excluding current product)
  const recommendations = items.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* PRODUCT SECTION */}
      <div className="grid md:grid-cols-2 gap-10 bg-white p-6 rounded shadow">
        {/* IMAGE */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-[320px] h-[420px] object-cover rounded"
          />
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

          <p className="text-sm text-gray-500 mb-3">{product.description}</p>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-yellow-500 font-semibold">
              ⭐ {product.rating || 4.5}
            </span>
            <span className="text-gray-400 text-sm">(1,248 reviews)</span>
          </div>

          <div className="text-3xl font-bold text-green-600 mb-4">
            {product.price}
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Inclusive of all taxes • Free Delivery
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => {
                if (!user) return navigate("/login");
                addToCart({ ...product, quantity: 1 });
              }}
              className="bg-black text-white px-6 py-3 rounded hover:opacity-90"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                if (!user) return navigate("/login");
                navigate("/buy", {
                  state: { type: "single", product },
                });
              }}
              className="border border-black px-6 py-3 rounded hover:bg-black hover:text-white"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>

        {[1, 2, 3].map((i) => (
          <div key={i} className="border-b py-4">
            <p className="font-semibold">User {i}</p>
            <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
            <p className="text-sm text-gray-600">
              Very good quality, worth the price. Highly recommended!
            </p>
          </div>
        ))}
      </div>

      {/* RECOMMENDATIONS */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Similar Products</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {recommendations.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/${category}/${item.id}`)}
              className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition"
            >
              <img
                src={item.image}
                className="h-40 w-full object-cover rounded mb-2"
              />
              <h3 className="text-sm font-semibold line-clamp-1">{item.title}</h3>
              <p className="text-green-600 font-bold text-sm">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Param;
