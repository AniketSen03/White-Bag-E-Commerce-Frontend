import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { usercontext } from "../App";


const AddCart = ({ cart, setCart }) => {
  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.price || 0) * (item.quantity || 1),
    0
  );

  const shipping = cart.length ? 40 : 0;
  const total = subtotal + shipping;
  const navigate = useNavigate();
  const { user } = useContext(usercontext);

  const updateQty = (id, type) => {
    setCart(prev =>
      prev.map(item =>
        item._id === id
          ? {
            ...item,
            quantity:
              type === "inc"
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1),
          }
          : item
      )
    );
  };


  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/add_to_cart/${id}`, {
        method: "DELETE",
      });
      setCart(cart.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 grid lg:grid-cols-3 gap-6">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <h2 className="text-xl font-semibold mb-4">
          Shopping Cart ({cart.length})
        </h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center gap-4 border rounded-lg p-4 bg-white shadow"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <button className="px-2 border" onClick={() => updateQty(item._id, "dec")}>−</button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button className="px-2 border" onClick={() => updateQty(item._id, "inc")}>+</button>

                  </div>

                  <span className="font-semibold">₹{item.price * item.quantity}</span>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 hover:text-red-700 text-lg"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-black text-white rounded-lg p-6 h-fit">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹{shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={() => {
            if (!user) {
              alert("Please login first");
              navigate("/login");
              return;
            }
            navigate("/buy/cart", {
              state: {
                type: "cart",
                cart: cart
              }
            });


          }}
          className="w-full bg-white text-black mt-6 py-3 rounded font-semibold"
        >
          Checkout
        </button>

      </div>
    </div>
  );
};

export default AddCart;
