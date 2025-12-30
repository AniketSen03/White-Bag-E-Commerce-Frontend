import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { usercontext } from "../App";

const Header = () => {
  const { user, setuser } = useContext(usercontext);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-black text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">White Bag</h1>

        <button
          className="md:hidden"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          ☰
        </button>

        <nav className={`${isNavOpen ? "block" : "hidden"} md:block`}>
          <ul className="flex flex-col md:flex-row gap-6 items-center">
            <Link to="/">All</Link>
            <Link to="/electronic">Electronics</Link>
            <Link to="/men-clothes">Men</Link>
            <Link to="/women-clothes">Women</Link>
            <Link to="/kid-clothes">Kids</Link>
            <Link to="/furniture">Furniture</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>

            {!user ? (
              <Link
                to="/login"
                className="bg-white text-black px-4 py-1"
              >
                Login
              </Link>
            ) : (
              <div className="relative">
                <div
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="bg-white text-black rounded-full px-3 cursor-pointer"
                >
                  {user.name?.[0]?.toUpperCase()}
                </div>

                {showDropdown && (
                  <button
                    onClick={() => setuser(null)}
                    className="absolute right-0 mt-2 bg-white text-black px-4 py-2 rounded shadow"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}

            <Link
              to="/add_to_cart"
              className="bg-white text-black px-4 py-1"
            >
              Cart
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
