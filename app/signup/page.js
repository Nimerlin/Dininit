"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./login.module.css"; // Use the same CSS Module for consistency

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

    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Validate other fields
    if (!fullName || !email || !phoneNumber || !address) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/signup", {
        name: fullName,
        email,
        phone: phoneNumber,
        address,
        password,
      });

      // Check if the response contains data (might be different based on your API structure)
      if (response.data) {
        setSuccess("Registration successful! Redirecting to login...");
        
        // Clear form fields
        setFullName("");
        setEmail("");
        setPhoneNumber("");
        setAddress("");
        setPassword("");
        setConfirmPassword("");

        // Ensure the success message is visible before redirecting
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      console.error("Signup error:", err); // Add this for debugging
      setError(err.response?.data?.message || "An error occurred while signing up.");
    }
  };

  return (
    <div className={styles["login-container"]}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className={styles["login-form"]}>
        {error && <div className={styles["error-message"]}>{error}</div>}
        {success && <div className={styles["success-message"]}>{success}</div>}
        
        <div className={styles["form-group"]}>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

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
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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

        <div className={styles["form-group"]}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles["login-button"]}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
