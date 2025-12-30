import React from 'react';
import { Link, useParams } from 'react-router-dom';
import collection from './data';

const Param = ({ addToCart }) => {
  const { category, id } = useParams();

  const categoryIndex = {
    men: 0,
    women: 1,
    kids: 2,
    electronics: 3,
    furniture: 4,
  }[category?.toLowerCase()];

  const items = collection[categoryIndex] || [];
  const product = items.find(item => item.id === parseInt(id));

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg text-gray-500">Product not found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={product.image}
            alt={product.title}
            className="w-full md:w-80 h-80 object-cover rounded-lg"
          />

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="font-bold text-2xl mb-2">{product.title}</h2>
              <p className="text-2xl font-bold text-emerald-600 mb-2">
                {product.price}
              </p>
              <p className="mb-2">
                <span className="text-orange-400 font-bold">
                  {product.rating}★
                </span>
                <span className="text-gray-500 ml-1">
                  ({product.reviews} reviews)
                </span>
              </p>
              <p className="text-gray-700 mb-4">{product.description}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => addToCart(product)}
                className="px-6 py-3 bg-black text-white rounded shadow"
              >
                Add to Cart
              </button>

              <Link
                to={`/buy/${category}/${product.id}`}
                className="px-6 py-3 bg-white border border-black text-black rounded shadow text-center"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-2xl font-semibold mb-4">Similar Products</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.slice(0, 4).map(e => (
            <Link to={`/${category}/${e.id}`} key={e.id}>
              <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg">
                <img
                  src={e.image}
                  alt={e.title}
                  className="h-36 w-full object-cover rounded mb-2"
                />
                <h2 className="font-semibold text-sm text-center">
                  {e.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Param;
