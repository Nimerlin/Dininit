import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Check if the user is logged in on component mount
  useEffect(() => {
    setMounted(true);

    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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

  // Handle logout functionality
  const handleLogout = () => {
    const alertContainer = document.createElement("div");
    alertContainer.className = styles.alert;
    alertContainer.innerHTML = `
      <span><strong>Warning!</strong> Successfully logged out! Redirecting to dashboard...</span>
      <button onclick="this.parentElement.remove()">×</button>
    `;

    document.body.appendChild(alertContainer);

    setTimeout(() => {
      alertContainer.classList.add(styles["fade-out"]);
      setTimeout(() => alertContainer.remove(), 500);
    }, 1500);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);

    setTimeout(() => {
      router.push("http://localhost:3000");
    }, 1500);
  };

  return (
    <nav
      className={`sticky top-0 z-50 ${
        scrolled ? "bg-[#02194e]" : "bg-transparent"
      } text-white w-full transition-colors duration-300`}
    >
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img src="/logo1-removebg.png" alt="Logo" className="h-14 w-32" />
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link href="/home">Home</Link>
          <Link href="/features">Features</Link>
          <Link href="/about">About</Link>
          <Link href="/overview">Overview</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/team">Team</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* User Actions */}
        <div className="flex space-x-4">
          {user ? (
            <>
              <span className="font-medium">
                Welcome, {user.username || user.name}!
              </span>
              <button
                className="border border-white px-4 py-2 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="border border-white px-4 py-2 rounded"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
              <button
                className="bg-white text-blue-900 px-4 py-2 rounded"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
