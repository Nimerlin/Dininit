import { useEffect } from "react";
import gsap from "gsap";
import Navbar from './Navbar'; // Import the Navbar component

export default function Header() {
  useEffect(() => {
    gsap.fromTo(".header-title", { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 });
    gsap.fromTo(".header-subtitle", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 1 });
    gsap.fromTo(".cta-button", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, delay: 1.5 });
  }, []);

  return (
    <div>
      <Navbar />
      <header className="bg-blue-900 min-h-screen flex flex-col md:flex-row justify-center items-center text-center md:text-left text-white px-6 py-16 relative">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="z-10 flex-1">
          <h1 className="header-title text-6xl font-extrabold mb-4">We're Building Modern Software</h1>
          <p className="header-subtitle text-2xl mb-8">Contained is by middleton am. Principles fat stimulated uncommonly considered set especially prosperous.</p>
          <a href="#learn-more">
            <button className="cta-button border border-white py-3 px-8 text-2xl rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-200">
              Learn More
            </button>
          </a>
        </div>
        <div className="z-10 flex-1 mt-8 md:mt-0">
          <img src="5.png" alt="Rocket" className="w-full h-auto" />
        </div>
      </header>
    </div>
  );
}
