// app/login/page.js or pages/login.js
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./login.module.css"; // Import CSS Module
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/login", { 
        email, 
        password 
      });

      if (response.data.token) {
        // Store the token
        localStorage.setItem('token', response.data.token);
        // Store user data and set username
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUsername(response.data.user.username || response.data.user.name);
        
        // Optional: Redirect after a short delay to show the welcome message
        setTimeout(() => {
          router.push("http://localhost:3000/services");
        }, 1500);
      } else {
        setError("Invalid credentials, please try again.");
      }
    } catch (err) {
      // More detailed error handling
      if (err.code === 'ECONNREFUSED') {
        setError("Unable to connect to the server. Please ensure the backend server is running.");
      } else if (err.response) {
        // Server responded with an error
        setError(err.response.data.error || "Login failed: " + err.response.status);
      } else if (err.request) {
        // Request was made but no response received
        setError("No response from server. Please check your internet connection.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Login error details:", err);
    }
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto p-5 rounded-lg bg-[#7B7F91] bg-opacity-40 shadow-lg flex flex-col justify-start items-center mt-20 pb-5">
        {username ? (
          <div className="text-center p-5 animate-fadeIn">
            <h2 className="font-bold text-2xl text-white">Welcome, {username}!</h2>
            <p>Redirecting to dashboard...</p>
          </div>
        ) : (
          <>
            <h2 className="font-bold text-2xl text-white text-center mb-5">Welcome Back </h2>
            <form onSubmit={handleSubmit} className="w-full">
              {error && <div className="text-red-500 text-sm text-center">{error}</div>}
              <div className="mb-4">
                <label htmlFor="email" className="block font-bold text-white">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 text-lg rounded-lg border border-[#222222] focus:border-[#020202] bg-[#7B7F91] bg-opacity-30 shadow-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block font-bold text-white">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 text-lg rounded-lg border border-[#222222] focus:border-[#020202] bg-[#7B7F91] bg-opacity-30 shadow-md"
                />
              </div>
              <button type="submit" className="w-full p-2 bg-blue-500 text-white text-lg rounded-lg cursor-pointer hover:bg-blue-600 shadow-md">Login</button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-white">New User? <a href="/signup" className="text-blue-400 underline hover:text-blue-500">Sign Up</a></p>
            </div>
          </>
        )}
      </div>
      <div className="pt-20">
        {/* Footer can be added here */}
      </div>
    </>
  );
};

export default LoginPage;
 