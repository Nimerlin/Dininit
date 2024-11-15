// app/login/page.js or pages/login.js
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./login.module.css"; // Import CSS Module

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API request to verify user credentials (replace URL with your API endpoint)
      const response = await axios.post("/api/login", { email, password });

      if (response.data.success) {
        // If login is successful, redirect to home page or dashboard
        router.push("/dashboard");  // Adjust path accordingly
      } else {
        setError("Invalid credentials, please try again.");
      }
    } catch (err) {
      setError("An error occurred while logging in.");
    }
  };

  return (
    <div className={styles["login-container"]}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className={styles["login-form"]}>
        {error && <div className={styles["error-message"]}>{error}</div>}
        
        <div className={styles["form-group"]}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles["login-button"]}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
