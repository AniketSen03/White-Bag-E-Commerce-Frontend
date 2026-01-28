import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { usercontext } from "../App";

const Header = () => {
  const { user, setuser, cart, setCart } = useContext(usercontext);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dropRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    setuser(null);
    setCart([]);              // 🔥 cart clear
    localStorage.removeItem("user");
    setDropdown(false);
    navigate("/login");
  };
  const [search, setSearch] = useState("");

  // close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // close dropdown on outside click
  useEffect(() => {
    const close = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  // lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <header className="bg-black text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold">
          White Bag
        </Link>

        {/* MOBILE ICON */}
        <button className="lg:hidden text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>

        {/* NAV */}
        <nav
          className={`
    fixed inset-0 bg-black/95 z-40
    transform transition-transform duration-300
    ${open ? "translate-x-0" : "-translate-x-full"}
    lg:static lg:translate-x-0 lg:bg-transparent
  `}
        >
          {/* MOBILE SEARCH */}
          <div className="p-4 lg:hidden">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && search.trim()) {
                  navigate(`/search/${search}`);
                  setOpen(false);
                }
              }}
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded text-black"
            />
          </div>

          <ul className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:gap-6">
            {/* DESKTOP SEARCH */}
            <li className="hidden lg:block">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && search.trim()) {
                    navigate(`/search/${search}`);
                  }
                }}
                placeholder="Search products..."
                className="px-4 py-1 rounded text-black"
              />
            </li>

            {/* LINKS */}
            {[
              ["All", "/"],
              ["Electronics", "/electronic"],
              ["Men", "/men-clothes"],
              ["Women", "/women-clothes"],
              ["Kids", "/kid-clothes"],
              ["Furniture", "/furniture"],
            ].map(([name, path]) => (
              <li key={path}>
                <Link to={path} className="hover:text-gray-300">
                  {name}
                </Link>
              </li>
            ))}

            {/* USER */}
            {!user ? (
              <li>
                <Link to="/login" className="bg-white text-black px-4 py-1 rounded">
                  Login
                </Link>
              </li>
            ) : (
              <li className="relative" ref={dropRef}>
                <div
                  onClick={() => setDropdown(!dropdown)}
                  className="bg-white text-black w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
                >
                  {user.name?.[0]?.toUpperCase()}
                </div>

                {dropdown && (
                  <div className="absolute right-0 mt-2 bg-white text-black rounded shadow w-40">
                    <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">
                      My Orders
                    </Link>
                    <Link to="/wishlist" className="block px-4 py-2 hover:bg-gray-100">
                      Wishlist
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
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
                className="bg-white text-black px-4 py-1 rounded flex gap-1"
              >
                Cart
                {cart.length > 0 && (
                  <span className="bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
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
