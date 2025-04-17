"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./login.module.css"; // Import CSS Module
import Navbar from '../components/Navbar'; // Import Navbar component

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!fullName || !email || !phoneNumber || !address) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(`${apiBaseUrl}/signup`, {
        name: fullName,
        email,
        phone: phoneNumber,
        address,
        password,
      });

      if (response.data) {
        setSuccess("Registration successful! Redirecting to login...");
        setFullName("");
        setEmail("");
        setPhoneNumber("");
        setAddress("");
        setPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "An error occurred while signing up.");
    }
  };

  return (
    <div>
      <Navbar /> {/* Add Navbar component here */}
      <div className={styles.signupContainer}>
        <h2 className={styles.signupTitle}>Sign Up</h2>
        <form onSubmit={handleSubmit} className={styles.signupForm}>
          {error && <div className={styles.errorMessage}>{error}</div>}
          {success && <div className={styles.successMessage}>{success}</div>}
          
          <div className={styles.formGroup}>
            <label htmlFor="fullName" className={styles.lbl}>Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className={styles.inp}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.lbl}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.inp}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phoneNumber" className={styles.lbl}>Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className={styles.inp}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address" className={styles.lbl}>Address</label>
            <input
              type="text"
              id="address"
              name="address"
              className={styles.inp}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.lbl}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.inp}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.lbl}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={styles.inp}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.signupButton}>Sign Up</button>
        </form>
        <div className={styles.loginPrompt}>
          <p>Already have an account? <a href="/login" className={styles.loginLink}>Login</a></p>
        </div>
      </div>
    </div>
    
  );
};

export default SignupPage;