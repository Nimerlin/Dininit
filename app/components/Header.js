import Logo from './Logo';
import Link from 'next/link';
import { useEffect } from "react";
import styles from './Header.module.css'; // Import the CSS module
import gsap from "gsap"; // GSAP for animations

export default function Header() {
  useEffect(() => {
    // GSAP animations for header elements
    gsap.fromTo(`.${styles.headerLogo}`, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1, delay: 0.5 });
    gsap.fromTo(`.${styles.headerNav}`, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 1 });
    gsap.fromTo(`.${styles.headerButtons}`, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, delay: 1.5 });
    
    // Hover animation for navigation links
    gsap.fromTo(
      `.${styles.navLink}`,
      { scale: 1, color: "#ffffff" },
      { scale: 1.1, color: "#00bfae", duration: 0.3, ease: "power1.out", repeat: -1, yoyo: true }
    );
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Logo and Title */}
        <div className={`flex items-center space-x-6 ${styles.headerLogo}`}>
          <Logo />
        </div>
        
        {/* Navigation Links */}
        <nav className={`flex items-center space-x-8 ${styles.headerNav}`}>
          <Link href="/services" className={`hover:text-gray-300 transition-all ease-in-out ${styles.navLink}`}>
            Services
          </Link>
          <Link href="/about" className={`hover:text-gray-300 transition-all ease-in-out ${styles.navLink}`}>
            About
          </Link>
          <Link href="/contact" className={`hover:text-gray-300 transition-all ease-in-out ${styles.navLink}`}>
            Contact
          </Link>
        </nav>

        {/* Notifications and Profile */}
        <div className={`flex items-center space-x-6 ${styles.headerButtons}`}>
          <button className="text-gray-400 hover:text-white transition-all ease-in-out">Notifications</button>
          <button className="text-gray-400 hover:text-white transition-all ease-in-out">Profile</button>
        </div>
      </div>
    </header>
  );
}
