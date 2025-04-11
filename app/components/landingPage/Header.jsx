import { useEffect } from "react";
import gsap from "gsap";

export default function Header() {
  useEffect(() => {
    gsap.fromTo(".header-title", { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 });
    gsap.fromTo(".header-subtitle", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 1 });
    gsap.fromTo(".cta-button", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, delay: 1.5 });

    // Continuous animation for the image
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(".header-image", { 
      scale: 1.1, 
      rotationY: 10, 
      duration: 1, 
      ease: "power1.inOut" 
    })
    .to(".header-image", { 
      scale: 1, 
      rotationY: 0, 
      duration: 1, 
      ease: "power1.inOut" 
    });
  }, []);

  return (
    <div>
      <header className="bg-blue-900 min-h-screen flex flex-col md:flex-row justify-center items-center text-center md:text-left text-white px-6 py-16 relative">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        <div className="z-10 flex-1 mt-8 md:mt-0 pl-4">
          <img src="5.png" alt="Rocket" className="header-image w-full h-auto max-w-md" />
        </div>
        
        <div className="z-10 flex-1">
          <h1 className="header-title text-6xl font-extrabold mb-4">We're Building Modern Software</h1>
          <p className="header-subtitle text-2xl mb-8">Contained is by middleton am. Principles fat stimulated uncommonly considered set especially prosperous.</p>
          <a href="#learn-more">
            <button className="cta-button border border-white py-3 px-8 text-2xl rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-200">
              Know More
            </button>
          </a>
        </div>
      </header>
    </div>
  );
}
