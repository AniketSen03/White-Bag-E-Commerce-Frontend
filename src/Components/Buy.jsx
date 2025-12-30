import React, { useState } from "react";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  paymentMethod: "credit",
  agree: false,
};

export default function Buy() {
  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {success ? (
        <div className="text-green-600 font-semibold text-center">
          🎉 Order placed successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              name="firstName"
              placeholder="First Name"
              required
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="lastName"
              placeholder="Last Name"
              required
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />

          <input
            name="phone"
            placeholder="Phone"
            required
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />

          <input
            name="address"
            placeholder="Address"
            required
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              name="city"
              placeholder="City"
              required
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="state"
              placeholder="State"
              required
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="agree"
              required
              onChange={handleChange}
            />
            I agree to terms & conditions
          </label>

          <button className="w-full bg-black text-white py-3 rounded font-semibold">
            Place Order
          </button>
        </form>
      )}
    </div>
  );
}
