"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./login.module.css"; // Use the same CSS Module for consistency
import Navbar from '../components/Navbar';

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess("");

    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Validate other fields
    if (!fullName || !email || !phoneNumber || !address) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/signup", {
        name: fullName,
        email,
        phone: phoneNumber,
        address,
        password,
      });

      // Check if the response contains data (might be different based on your API structure)
      if (response.data) {
        setSuccess("Registration successful! Redirecting to login...");
        
        // Clear form fields
        setFullName("");
        setEmail("");
        setPhoneNumber("");
        setAddress("");
        setPassword("");
        setConfirmPassword("");

        // Ensure the success message is visible before redirecting
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      console.error("Signup error:", err); // Add this for debugging
      setError(err.response?.data?.message || "An error occurred while signing up.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-5 rounded-lg bg-[rgba(123,129,145,0.16)] shadow-lg flex flex-col justify-start items-center mt-20 pb-5">
      <h2 className="font-bold text-2xl text-white text-center mb-5">Sign Up</h2>
      <form onSubmit={handleSubmit} className="w-full">
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        {success && <div className="text-green-500 text-sm text-center">{success}</div>}
        
        <div className="mb-4">
          <label htmlFor="fullName" className="block font-bold text-white">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full p-2 text-lg rounded-lg border border-[#222222] focus:border-[#020202] bg-[#7B7F91] bg-opacity-30 shadow-md"
          />
        </div>

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
          <label htmlFor="phoneNumber" className="block font-bold text-white">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="w-full p-2 text-lg rounded-lg border border-[#222222] focus:border-[#020202] bg-[#7B7F91] bg-opacity-30 shadow-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block font-bold text-white">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block font-bold text-white">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-2 text-lg rounded-lg border border-[#222222] focus:border-[#020202] bg-[#7B7F91] bg-opacity-30 shadow-md"
          />
        </div>

        <button type="submit" className="w-full p-2 bg-blue-500 text-white text-lg rounded-lg cursor-pointer hover:bg-blue-600 shadow-md">Sign Up</button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-white">Already have an account? <a href="/login" className="text-blue-400 underline hover:text-blue-500">Login</a></p>
      </div>
    </div>
  );
};

export default SignupPage;
