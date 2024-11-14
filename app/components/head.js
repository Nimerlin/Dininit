// components/Header.js
"use client"; // Ensure this runs on the client side

import { useEffect } from "react";
import gsap from "gsap";

const Header = () => {
  useEffect(() => {
    // GSAP Animations for text and button entrance
    gsap.fromTo(".header-title", { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 });
    gsap.fromTo(".header-subtitle", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 1 });
    gsap.fromTo(".cta-button", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, delay: 1.5 });
  }, []);

  return (
    <header className="bg-tech-bg bg-cover bg-center min-h-screen flex flex-col justify-center items-center text-center text-white px-6 py-16 relative">
      <div className="absolute inset-0 bg-black opacity-40"></div> {/* Overlay for contrast */}
      <div className="z-10">
        <h1 className="header-title text-6xl font-extrabold mb-4 animate__animated animate__fadeIn text-teal">
          Welcome to Dinenit Monitoring Tool
        </h1>
        <p className="header-subtitle text-2xl mb-8 animate__animated animate__fadeInUp text-neon-pink">
          A powerful, real-time system monitoring platform.
        </p>
        <a href="#getting-started">
          <button className="cta-button bg-teal py-3 px-8 text-2xl rounded-lg hover:bg-teal-700 transition-all transform duration-200">
            Get Started
          </button>
        </a>
      </div>
    </header>
  );
};

export default Header;
