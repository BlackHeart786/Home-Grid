import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 animate-gradient-x">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Login Card */}
      <div className="z-10 w-full max-w-md px-8 py-10 bg-white bg-opacity-70 rounded-2xl shadow-xl backdrop-blur-lg transform transition-transform duration-300 hover:scale-105">
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
            Sign In
          </h2>
          <p className="text-sm text-gray-600">
            Enter your credentials to access your account.
          </p>
        </div>

        {/* Social Login */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            className="flex items-center justify-center w-12 h-12 text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            aria-label="Login with Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </button>
          <button
            className="flex items-center justify-center w-12 h-12 text-white bg-red-500 rounded-full shadow-lg hover:bg-red-600 transition-colors"
            aria-label="Login with Google"
          >
            <i className="fab fa-google"></i>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Email Input */}
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 mt-2 text-black placeholder-gray-500 bg-white bg-opacity-60 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300 ease-in-out"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 mt-2 text-black placeholder-gray-500 bg-white bg-opacity-60 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300 ease-in-out"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>

        {/* Links */}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <a
            href="/forgot-password"
            className="hover:text-blue-500 hover:underline"
          >
            Forgot Password?
          </a>
          <a href="/registration" className="text-blue-600 hover:underline">
            Create an Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
