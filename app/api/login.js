// pages/api/login.js
import { users } from "../../data/users"; // Example mock data, replace with your actual database query

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Find the user in the mock database (replace with actual database lookup)
    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Simple password comparison (without bcrypt for now)
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // If credentials are valid, return success
    return res.status(200).json({ success: true, message: "Login successful", user });
  } else {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
