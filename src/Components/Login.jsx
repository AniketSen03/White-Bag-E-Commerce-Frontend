import React, { useState, useContext } from "react";
import { usercontext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Api_url = 'http://localhost:3000/login';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setuser } = useContext(usercontext);
  const navigate = useNavigate();
  const submitted = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(Api_url, { email, password });
      alert(res.data.message);
      setEmail('');
      setPassword('');
      setuser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user))
navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={submitted} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-600"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-600"
            required
          />
          <button className="bg-black text-white py-2 rounded-md hover:opacity-90 transition">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          New here?{' '}
          <Link to="/signin" className=" text-gray-500 font-semibold hover:text-black hover:underline transition-all 3s ease-linear">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
