import React from 'react';
import collection from '../Components/data';
import { Link } from 'react-router-dom';

const Furniture = ({ addToCart }) => {
  const items = collection[4]; // furniture index

  return (
    <div className="px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">
        Furniture Collection
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {items.map(item => (
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
                  onClick={() => addToCart(item)}
                  className="flex-1 py-2 bg-black text-white text-sm rounded"
                >
                  Add
                </button>

                <Link
                  to={`/buy/furniture/${item.id}`}
                  className="flex-1 py-2 border border-black text-black text-sm rounded text-center hover:bg-black hover:text-white"
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
