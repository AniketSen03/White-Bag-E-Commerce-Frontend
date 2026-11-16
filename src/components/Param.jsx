import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import collection from "./data";
import { usercontext } from "../App";

const Param = () => {
  const { addToCart, user, addToWishlist } = useContext(usercontext);
  const { category, id } = useParams();
  const navigate = useNavigate();

  const categoryIndex = {
    men: 0,
    "men-clothes": 0,
    women: 1,
    "women-clothes": 1,
    kid: 2,
    kids: 2,
    "kid-clothes": 2,
    electronic: 3,
    electronics: 3,
    furniture: 4,
  };

  const items = collection[categoryIndex[category]] || [];
  const product = items.find((p) => Number(p.id) === Number(id));

  if (!product) {
    return <p className="text-center mt-20 text-xl">Product not found 😕</p>;
  }

  const [activeImg, setActiveImg] = useState(
    product.images?.[0] || product.image
  );
  const [qty, setQty] = useState(1);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const recommendations = items
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const applyCoupon = () => {
    if (coupon === "SAVE10") setDiscount(10);
    else alert("Invalid Coupon");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* PRODUCT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-4 md:p-6 rounded shadow">

        {/* IMAGES */}
        <div>
          <img
            src={activeImg}
            className="w-full h-[320px] md:h-[420px] object-cover rounded border"
          />

          <div className="flex gap-3 mt-3 overflow-x-auto">
            {(product.images || [product.image]).map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImg(img)}
                className={`h-16 w-16 object-cover border cursor-pointer ${
                  activeImg === img ? "border-black" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            {product.title}
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            {product.description}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-yellow-500">
              ⭐ {product.rating || 4.5}
            </span>
            <span className="text-gray-400 text-sm">(1,248 reviews)</span>
          </div>

          <div className="text-2xl md:text-3xl font-bold text-green-600 mt-4">
            {product.price}
          </div>

          {discount > 0 && (
            <p className="text-green-500 text-sm mt-1">
              Coupon applied: {discount}% OFF
            </p>
          )}

          <p className="text-sm text-gray-600 mt-2">
            Free delivery by <b>Tomorrow</b> | COD Available
          </p>

          {/* QTY */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="border px-3 py-1"
            >
              −
            </button>
            <span>{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="border px-3 py-1"
            >
              +
            </button>
          </div>

          {/* COUPON */}
          <div className="flex gap-2 mt-4">
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon"
              className="border px-3 py-2 text-sm flex-1"
            />
            <button onClick={applyCoupon} className="border px-4">
              Apply
            </button>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={() => {
                if (!user) return navigate("/login");
                addToCart({ ...product, quantity: qty });
              }}
              className="bg-black text-white px-6 py-3 rounded w-full"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                if (!user) return navigate("/login");
                navigate("/buy", {
                  state: { type: "single", product: { ...product, quantity: qty } },
                });
              }}
              className="border border-black px-6 py-3 rounded w-full"
            >
              Buy Now
            </button>

            <button
              onClick={() => addToWishlist(product)}
              className="border px-4 py-3 rounded text-red-500 text-xl"
            >
              ❤️
            </button>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="mt-8 bg-white p-4 md:p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Customer Reviews</h2>

        {[1, 2, 3].map((i) => (
          <div key={i} className="border-b py-4">
            <p className="font-semibold">Verified Buyer</p>
            <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
            <p className="text-sm text-gray-600">
              Excellent quality. Totally worth it!
            </p>
          </div>
        ))}
      </div>

      {/* SIMILAR */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Similar Products</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {recommendations.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/${category}/${item.id}`)}
              className="bg-white p-3 rounded shadow cursor-pointer"
            >
              <img
                src={item.image}
                className="h-36 w-full object-cover rounded"
              />
              <h3 className="text-sm font-semibold mt-2 line-clamp-1">
                {item.title}
              </h3>
              <p className="text-green-600 font-bold text-sm">
                {item.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Param;
