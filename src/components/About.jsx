import React from "react";

const About = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>

        <p className="text-gray-600 max-w-3xl mx-auto">
          Welcome to our e-commerce platform. We focus on quality products,
          fair pricing, and a smooth shopping experience you can trust.
        </p>

        <div className="grid sm:grid-cols-2 gap-8 mt-10 text-left">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-2">Our Values</h3>
            <ul className="space-y-1 text-gray-600">
              <li>✔ Customer Satisfaction</li>
              <li>✔ Quality Products</li>
              <li>✔ Transparency</li>
              <li>✔ Continuous Improvement</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-2">Why Shop With Us?</h3>
            <ul className="space-y-1 text-gray-600">
              <li>✔ Wide product range</li>
              <li>✔ Fast delivery</li>
              <li>✔ Secure payments</li>
              <li>✔ Support you can trust</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
