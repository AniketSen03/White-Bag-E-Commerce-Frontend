import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { usercontext } from "../App";

const Header = () => {
  const { user, setuser, cart } = useContext(usercontext);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <header className="bg-black text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold">
          White Bag
        </Link>

        {/* MOBILE ICON */}
        <button
          className="lg:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* NAV */}
        <nav
          className={`
            ${open ? "block" : "hidden"}
            absolute top-full left-0 w-full bg-black
            lg:static lg:block lg:w-auto
          `}
        >
          <ul className="
            flex flex-col gap-4 p-4
            lg:flex-row lg:items-center lg:gap-6 lg:p-0
          ">
            {[
              ["All", "/"],
              ["Electronics", "/electronic"],
              ["Men", "/men-clothes"],
              ["Women", "/women-clothes"],
              ["Kids", "/kid-clothes"],
              ["Furniture", "/furniture"],
              ["About", "/about"],
              ["Contact", "/contact"],
            ].map(([name, path]) => (
              <li key={path}>
                <Link
                  to={path}
                  onClick={() => setOpen(false)}
                  className="block hover:text-gray-300"
                >
                  {name}
                </Link>
              </li>
            ))}

            {/* LOGIN / USER */}
            {!user ? (
              <li>
                <Link
                  to="/login"
                  className="bg-white text-black px-4 py-1 rounded"
                >
                  Login
                </Link>
              </li>
            ) : (
              <li className="relative" ref={dropRef}>
                <div
                  onClick={() => setDropdown(!dropdown)}
                  className="bg-white text-black w-9 h-9 rounded-full flex items-center justify-center cursor-pointer font-semibold"
                >
                  {user.name?.[0]?.toUpperCase()}
                </div>

                {dropdown && (
                  <div className="absolute right-0 mt-2 bg-white text-black rounded shadow w-32">
                    <button
                      onClick={() => {
                        setuser(null);
                        setDropdown(false);
                      }}
                      className="w-full px-4 py-2 hover:bg-gray-100 text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            )}

            {/* CART */}
            <li>
              <Link
                to="/add_to_cart"
                className="relative bg-white text-black px-4 py-1 rounded"
              >
                Cart
                {cart?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
