import { useState } from "react";
import axios from "axios";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Registration successful:", response.data);
      alert("Registration successful!");
    } catch (err) {
      console.error("Error during registration:", err);
      alert("Registration failed: " + err.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="z-10 w-full max-w-md px-8 py-10 bg-white bg-opacity-80 rounded-2xl shadow-xl backdrop-blur-lg transform transition-transform duration-300 hover:scale-105">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-sm text-gray-600">
            Enter your details to register.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-3 mt-2 text-black placeholder-gray-500 bg-white bg-opacity-60 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300 ease-in-out"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 mt-2 text-black placeholder-gray-500 bg-white bg-opacity-60 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300 ease-in-out"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 mt-2 text-black placeholder-gray-500 bg-white bg-opacity-60 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300 ease-in-out"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 mt-2 text-black placeholder-gray-500 bg-white bg-opacity-60 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition duration-300 ease-in-out"
          >
            Register
          </button>
        </form>
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
