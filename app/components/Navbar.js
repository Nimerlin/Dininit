import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

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
      router.push(`${apiBaseUrl}`);
    }, 1500);
  };

  return (
    <nav
      className={`sticky top-0 z-50 ${
        scrolled ? "bg-[#242424]" : "bg-transparent"
      } text-white w-full transition-colors duration-300`}
    >
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img src="/logo1-removebg.png" alt="Logo" className="h-14 w-32" />
        </div>


        <div className="flex space-x-6">
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="#features" className={styles.navLink}>Features</Link>
          <Link href="#about" className={styles.navLink}>About</Link>
          <Link href="#pricing" className={styles.navLink}>Pricing</Link>
          <Link href="#contact" className={styles.navLink}>Contact</Link>
          {user && <Link href="/ticket" className={styles.navLink}>Create Ticket</Link>}
          {user && <Link href="/view-tickets" className={styles.navLink}>View Tickets</Link>}
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="font-medium text-lg">
                Welcome, {user.username || user.name}!
              </span>
              <button
                className="px-6 py-2 border-2 border-white text-white hover:bg-white hover:text-black rounded-lg transition-all duration-300 font-medium"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="px-6 py-2 bg-white text-black hover:bg-transparent hover:text-white border-2 border-white rounded-lg transition-all duration-300 font-medium"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
              <button
                className="px-6 py-2 border-2 border-white text-white hover:bg-white hover:text-black rounded-lg transition-all duration-300 font-medium"
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
