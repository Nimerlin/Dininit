// components/BottomBar.js

import React, { useEffect } from "react";
import styles from './BottomBar.module.css'; // Importing the CSS module
import gsap from "gsap"; // GSAP for animations

const BottomBar = () => {
  useEffect(() => {
    // GSAP animations for bottom bar elements
    gsap.fromTo(`.${styles.bottomBarLogo}`, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1, delay: 0.5 });
    gsap.fromTo(`.${styles.bottomBarNav}`, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 1 });
    gsap.fromTo(`.${styles.bottomBarButtons}`, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, delay: 1.5 });
    
    // Hover animation for navigation links in bottom bar
    gsap.fromTo(
      `.${styles.navLink}`,
      { scale: 1, color: "#ffffff" },
      { scale: 1.1, color: "#00bfae", duration: 0.3, ease: "power1.out", repeat: -1, yoyo: true }
    );
  }, []);

  return (
    <footer className={styles.bottomBar}>
      <div className={styles.bottomBarContainer}>
        {/* Logo or Title */}
        <div className={`flex items-center space-x-6 ${styles.bottomBarLogo}`}>
          <span>MyApp</span>
        </div>

        {/* Navigation Links */}
        <nav className={`flex items-center space-x-8 ${styles.bottomBarNav}`}>
          <a href="/privacy" className={`hover:text-gray-300 transition-all ease-in-out ${styles.navLink}`}>
            Privacy Policy
          </a>
          <a href="/terms" className={`hover:text-gray-300 transition-all ease-in-out ${styles.navLink}`}>
            Terms of Service
          </a>
          <a href="/contact" className={`hover:text-gray-300 transition-all ease-in-out ${styles.navLink}`}>
            Contact Us
          </a>
        </nav>

        {/* Social Media Links */}
        <div className={`flex items-center space-x-6 ${styles.bottomBarButtons}`}>
          <button className="text-gray-400 hover:text-white transition-all ease-in-out">Facebook</button>
          <button className="text-gray-400 hover:text-white transition-all ease-in-out">Twitter</button>
          <button className="text-gray-400 hover:text-white transition-all ease-in-out">Instagram</button>
        </div>
      </div>
    </footer>
  );
};

export default BottomBar;
