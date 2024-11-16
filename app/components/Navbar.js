import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? 'bg-blue-900' : 'bg-transparent'} text-white fixed w-full transition-colors duration-300`}>
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <span className="text-xl font-bold">Gostart</span>
        </div>
        <div className="flex space-x-6">
          <Link href="/home">Home</Link>
          <Link href="/features">Features</Link>
          <Link href="/about">About</Link>
          <Link href="/overview">Overview</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/team">Team</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="flex space-x-4">
          <button className="border border-white px-4 py-2 rounded">Login</button>
          <button className="bg-white text-blue-900 px-4 py-2 rounded">Sign Up</button>
        </div>
      </div>
    </nav>
  );
}