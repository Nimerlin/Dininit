// app/login/page.js or pages/login.js
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from 'next/link'; // Import Link component from Next.js
import styles from "./login.module.css"; // Import CSS Module
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const router = useRouter();

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const uiBaseUrl = process.env.NEXT_PUBLIC_UI_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiBaseUrl}/login`, { 
        email, 
        password 
      });

      if (response.data.token) {
        // Store the token
        localStorage.setItem('token', response.data.token);
        // Store user data and set username
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUsername(response.data.user.username || response.data.user.name);
        
        // Check subscription status
        const subscriptionResponse = await axios.post(`${apiBaseUrl}//verify-subscription`, {
          userId: response.data.user.name
        });

        // Redirect based on subscription status
        setTimeout(() => {
          if (subscriptionResponse.data.subscribed === 'yes') {
            router.push(`${uiBaseUrl}/services`);
          } else {
            router.push(`${apiBaseUrl}/payment`);
          }
        }, 1500);
      } else {
        setError("Invalid credentials, please try again.");
      }
    } catch (err) {
      // More detailed error handling
      if (err.code === 'ECONNREFUSED') {
        setError("Unable to connect to the server. Please ensure the backend server is running.");
      } else if (err.response) {
        // Server responded with an error
        setError(err.response.data.error || "Login failed: " + err.response.status);
      } else if (err.request) {
        // Request was made but no response received
        setError("No response from server. Please check your internet connection.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Login error details:", err);
    }
  };

  return (
    <>
      <div className={styles["login-container"]}>
        {username ? (
          <div className={styles["welcome-message"]}>
            <h2>Welcome, {username}!</h2>
            <p>Redirecting to dashboard...</p>
          </div>
        ) : (
          <>
            <h1>Login</h1>
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
              <div className={styles["signup-link"]}>
               Don't have an account?  <Link href="/signup"> Sign up</Link>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default LoginPage;