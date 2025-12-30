import React, { createContext, useEffect, useState } from 'react'
import Kid from './Components/Kid'
import Header from './Components/Header'
import Men from './Components/Men'
import Women from './Components/Women'
import Furniture from './Components/Furniture'
import Electronic from './Components/Electronic'
import Footer from './Components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import About from './Components/About'
import Contact from './Components/Contact'
import AddCart from './Components/Addcart'
import Param from './Components/Param'
import Login from './Components/Login'
import Signin from './Components/Sign'
import Buy from './Components/Buy'

export const usercontext = createContext()

const App = () => {
  const [cart, setCart] = useState([]);
  const [user, setuser] = useState(null)
  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch('http://localhost:3000/add_to_cart');
      const data = await res.json();
      setCart(data); // Load from DB on reload
    };
    fetchCart();
  }, []);

  const addToCart = async (item) => {
    const cleaned = {
      title: item.title,
      description: item.description,
      image: item.image,
      price: parseFloat(item.price.replace(/[^\d.]/g, '')),
    };

    const res = await fetch('http://localhost:3000/add_to_cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cleaned),
    });

    const saved = await res.json();
    setCart(prev => [...prev, saved]); // Add to state
  };

  return (
    <>
      <usercontext.Provider value={{ user, setuser }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/men-clothes' element={<Men addToCart={addToCart} />} />
            <Route path='/women-clothes' element={<Women addToCart={addToCart} />} />
            <Route path='/kid-clothes' element={<Kid addToCart={addToCart} />} />
            <Route path='/furniture' element={<Furniture addToCart={addToCart} />} />
            <Route path='/electronic' element={<Electronic addToCart={addToCart} />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/add_to_cart' element={<AddCart cart={cart} setCart={setCart} />} />
            <Route path='/:category/:id' element={<Param addToCart={addToCart} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/buy/:category/:id' element={<Buy />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </usercontext.Provider>
    </>
  )
}

export default App