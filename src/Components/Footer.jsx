import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-sm text-center">
        {[
          ["Company", ["About", "Careers", "Blog"]],
          ["Support", ["Help Center", "Returns", "FAQs"]],
          ["Shop", ["Men", "Women", "Electronics"]],
          ["Social", ["Facebook", "Instagram", "LinkedIn"]],
          ["Legal", ["Privacy", "Terms"]],
        ].map(([title, items]) => (
          <div key={title}>
            <h3 className="font-bold mb-3">{title}</h3>
            <ul className="space-y-1 text-gray-300">
              {items.map((i) => (
                <li key={i} className="hover:text-white cursor-pointer">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-xs">
        © {new Date().getFullYear()} White Bag · Built by Aniket Sen
      </div>
    </footer>
  );
};

export default Footer;
