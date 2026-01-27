import React, { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import collection from "./data";
import { usercontext } from "../App";

const Param = () => {
  const { addToCart, user } = useContext(usercontext);
  const { category, id } = useParams();
  const navigate = useNavigate();

  const categoryIndex = {
    men: 0,
    women: 1,
    kids: 2,
    electronics: 3,
    furniture: 4,
  }[category];

  const items = collection[categoryIndex] || [];
  const product = items.find((p) => p.id === Number(id));

  if (!product) return <p>Product not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold">{product.title}</h2>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => {
            if (!user) {
              navigate("/login");
              return;
            }
            addToCart(product);
          }}
          className="bg-black text-white px-6 py-2 rounded"
        >
          Add to Cart
        </button>

        <button
          onClick={() => {
            if (!user) {
              navigate("/login");
              return;
            }
            navigate(`/buy/${category}/${product.id}`, { state: product });
          }}
          className="border border-black px-6 py-2 rounded"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Param;
