import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for HTTP requests

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To capture and display error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError("");

    try {
      // Sending POST request to your backend login API
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email,
          password,
        }
      );

      // Destructure the response to get the token and user details
      const { user, token } = response.data;

      // Save the token (e.g., in localStorage or sessionStorage)
      localStorage.setItem("authToken", token);

      // Optionally, store user details in localStorage (for use in UI)
      localStorage.setItem("user", JSON.stringify(user));

      // Display success alert with user.user_id
      alert(`Login successful! Welcome, User ID: ${user.user_id}`);

      // Navigate to a different page on successful login
      navigate("/"); // Or any page you want to redirect to
    } catch (err) {
      // Handle error (e.g., incorrect credentials)
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Invalid email or password.");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error("Login error:", err);
    }
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

        {/* Error Message */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

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
