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
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      // Make API request to register the user (replace with your actual API endpoint)
      const response = await axios.post("/api/signup", {
        fullName,
        email,
        phoneNumber,
        address,
        password,
      });

      if (response.data.success) {
        // If signup is successful, redirect to login page
        router.push("/login");
      } else {
        setError(response.data.message || "Error creating the account.");
      }
    } catch (err) {
      setError("An error occurred while signing up.");
    }
  };

  return (
    <div className={styles["login-container"]}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className={styles["login-form"]}>
        {error && <div className={styles["error-message"]}>{error}</div>}
        
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
