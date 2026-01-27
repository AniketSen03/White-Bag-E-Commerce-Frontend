import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { usercontext } from "../App";

const Api_url = "http://localhost:3000/signup";

const Signin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigate =useNavigate();
  // ✅ HOOK INSIDE COMPONENT + CORRECT CONTEXT
  const { setuser } = useContext(usercontext);

  const submitted = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(Api_url, { name, email, password });

      alert(res.data.message);

      // ✅ SAVE USER
      setuser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
navigate("/");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <form onSubmit={submitted} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-zinc-600"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-zinc-600"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-zinc-600"
            required
          />

          <button className="bg-black text-white py-2 rounded-md">
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
