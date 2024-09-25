"use client";

import React, { useState } from "react";
import { useRedux } from "../hooks/useRedux";
import { loginUser } from "@/state/slices/userSlice";

const Login: React.FC = () => {
  const { dispatchAction, selector } = useRedux((state) => state.user);

  const { loading, error, isAuthenticated } = selector;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatchAction(loginUser, { email, password });
  };

  console.log("userInfo authenticated : ", isAuthenticated);

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="backdrop-blur-md bg-white/10 p-10 rounded-xl shadow-lg max-w-sm w-full">
        <h1 className="text-center text-2xl text-highlight font-bold mb-6">
          Login
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-highlight text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 rounded-lg bg-secondary bg-opacity-10 text-highlight placeholder-highlight focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-highlight text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 rounded-lg bg-secondary bg-opacity-10 text-highlight placeholder-highlight focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 mt-4 bg-accent text-white rounded-lg font-bold hover:bg-opacity-90 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
