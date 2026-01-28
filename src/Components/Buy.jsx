import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usercontext } from "../App";

const Buy = () => {
  const { user, cart, setCart } = useContext(usercontext);
  const navigate = useNavigate();
  const location = useLocation();

  const [payment, setPayment] = useState("cod");
  const [form, setForm] = useState({});
  const [success, setSuccess] = useState(false);

useEffect(() => {
  if (user === null) navigate("/login");
}, [user]);


const { type, product, cart: stateCart } = location.state || {};

let checkoutItems = [];

if (type === "single" && product) {
  checkoutItems = [{ ...product, quantity: 1 }];
} else if (type === "cart" && stateCart?.length) {
  checkoutItems = stateCart;
}

if (!checkoutItems.length) {
  return <h2 className="text-center mt-20">Product not found</h2>;
}


  const getPrice = (price) =>
    typeof price === "number"
      ? price
      : Number(String(price).replace(/[^\d]/g, ""));

  const subtotal = checkoutItems.reduce(
    (sum, i) => sum + getPrice(i.price) * (i.quantity || 1),
    0
  );

  const gst = Math.round(subtotal * 0.05);
  const delivery = 40;
  const total = subtotal + gst + delivery;

  const placeOrder = async () => {
    await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        items: checkoutItems,
        shippingDetails: form,
        paymentMethod: payment,
        totalAmount: total,
        status: payment === "upi" ? "Paid" : "Pending",
      }),
    });

    setCart([]);

    if (payment === "upi") {
      setSuccess(true);
      setTimeout(() => navigate("/"), 3000);
    } else {
      navigate("/myorders");
    }
    setOrders(prev => [
  ...prev,
  {
    id: Date.now(),
    items: checkoutItems,
    total,
    date: new Date().toLocaleDateString(),
    status: "Confirmed"
  }
]);

  };

  // 🎉 PAYMENT SUCCESS SCREEN
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f9d58]">
        <div className="bg-white p-10 rounded-3xl text-center w-[360px]">
          <div className="w-24 h-24 mx-auto rounded-full bg-green-100 flex items-center justify-center">
            ✅
          </div>
          <h2 className="text-2xl font-bold mt-6">Payment Successful</h2>
          <p className="text-gray-500 mt-2">₹{total} paid via UPI</p>
          <p className="text-xs mt-4 text-gray-400">
            Redirecting to home...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 grid lg:grid-cols-3 gap-6">
      {/* LEFT */}
      <div className="lg:col-span-2 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

        {["name", "phone", "email", "address", "city", "state", "zip"].map(
          (f) => (
            <input
              key={f}
              placeholder={f.toUpperCase()}
              value={form[f] || ""}
              className="border p-3 rounded w-full mb-3"
              onChange={(e) =>
                setForm({ ...form, [f]: e.target.value })
              }
            />
          )
        )}

        <h2 className="text-xl font-semibold mt-6 mb-3">Payment</h2>

        <label className="flex gap-2 mb-2">
          <input
            type="radio"
            checked={payment === "cod"}
            onChange={() => setPayment("cod")}
          />
          Cash on Delivery
        </label>

        <label className="flex gap-2 mb-2">
          <input
            type="radio"
            checked={payment === "upi"}
            onChange={() => setPayment("upi")}
          />
          UPI
        </label>

        {payment === "upi" && (
          <input
            placeholder="example@upi"
            className="border p-3 rounded w-full mt-2"
            onChange={(e) =>
              setForm({ ...form, upi: e.target.value })
            }
          />
        )}
      </div>

      {/* RIGHT */}
      <div className="bg-black text-white p-6 rounded h-fit">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {checkoutItems.map((i, idx) => (
          <div key={idx} className="flex justify-between text-sm mb-2">
            <span>{i.title} × {i.quantity}</span>
            <span>₹{getPrice(i.price) * i.quantity}</span>
          </div>
        ))}

        <hr className="my-3 opacity-30" />

        <div className="flex justify-between text-sm">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button
          onClick={placeOrder}
          className="w-full bg-white text-black py-3 rounded mt-6 font-semibold"
        >
          {payment === "upi" ? "Pay Now" : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Buy;
