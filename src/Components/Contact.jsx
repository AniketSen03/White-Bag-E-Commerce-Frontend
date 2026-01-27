import axios from "axios";
import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/contact", formData);
    alert("Message sent");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Contact Us</h2>

        <form
          className="bg-white p-6 rounded-lg shadow space-y-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full border p-3 rounded"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full border p-3 rounded"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            className="w-full border p-3 rounded resize-none"
            required
            value={formData.message}
            onChange={handleChange}
          />

          <button className="w-full bg-black text-white py-3 rounded">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
