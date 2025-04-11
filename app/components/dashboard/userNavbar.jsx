"use client"
import React, { useState, useEffect } from 'react';
import { FaUser, FaPowerOff } from 'react-icons/fa';
import Link from 'next/link';

const UserNavbar = ({ user, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for dynamic background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`sticky top-0 z-50 ${
      scrolled ? "bg-[#02194e]" : "bg-transparent"
    } text-white w-full transition-colors duration-300`}>
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img src="/logo1-removebg.png" alt="Logo" className="h-14 w-32" />
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/ticket">Create Ticket</Link>
          <Link href="/view-tickets">View Tickets</Link>
          <Link href="/settings">Settings</Link>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-2">
            <FaUser className="text-lg" />
            <span className="font-medium text-lg">
              Welcome, {user}!
            </span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-6 py-2 border-2 border-white text-white hover:bg-white hover:text-black rounded-lg transition-all duration-300 font-medium"
          >
            <FaPowerOff />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;


