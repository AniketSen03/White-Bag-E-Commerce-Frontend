import React, { createContext, useEffect, useState } from "react";
import Kid from "./Components/Kid";
import Header from "./Components/Header";
import Men from "./Components/Men";
import Women from "./Components/Women";
import Furniture from "./Components/Furniture";
import Electronic from "./Components/Electronic";
import Footer from "./Components/Footer";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import AddCart from "./Components/Addcart";
import Param from "./Components/Param";
import Login from "./Components/Login";
import Signin from "./Components/Sign";
import Buy from "./Components/Buy";
import MyOrders from "./Components/MyOrders";
import OrderDetails from "./Components/OrderDetails";

export const usercontext = createContext();

const App = () => {
  const [cart, setCart] = useState([]);
  const [user, setuser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // 🔹 Load cart from DB when app loads
  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch("http://localhost:3000/add_to_cart");
      const data = await res.json();
      setCart(data);
    };
    fetchCart();
  }, []);

  // 🔹 Persist user
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // 🔹 ADD TO CART (LOGIN REQUIRED)
  const addToCart = async (item) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    const cleaned = {
      title: item.title,
      description: item.description,
      image: item.image,
      price: parseFloat(item.price.replace(/[^\d.]/g, "")),
    };

    const res = await fetch("http://localhost:3000/add_to_cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleaned),
    });

    const saved = await res.json();
    setCart((prev) => [...prev, saved]);
  };

  return (
    <usercontext.Provider
      value={{
        user,
        setuser,
        cart,
        setCart,
        addToCart,
      }}
    >
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men-clothes" element={<Men addToCart={addToCart} />} />
          <Route path="/women-clothes" element={<Women addToCart={addToCart} />} />
          <Route path="/kid-clothes" element={<Kid addToCart={addToCart} />} />
          <Route path="/furniture" element={<Furniture addToCart={addToCart} />} />
          <Route path="/electronic" element={<Electronic addToCart={addToCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/add_to_cart" element={<AddCart cart={cart} setCart={setCart} />} />
          <Route path="/:category/:id" element={<Param addToCart={addToCart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/buy/:category/:id" element={<Buy />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />

        </Routes>

        <Footer />
      </BrowserRouter>
    </usercontext.Provider>
  );
};

export default App;
