import React from "react";

const Contact = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Contact Us</h2>
        <p className="text-center text-gray-600 mb-8">
          Have questions? We'd love to hear from you.
        </p>

        <form className="bg-white p-6 rounded-lg shadow space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border p-3 rounded"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border p-3 rounded"
            required
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full border p-3 rounded resize-none"
            required
          />

          <button className="w-full bg-black text-white py-3 rounded font-semibold hover:opacity-90">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
