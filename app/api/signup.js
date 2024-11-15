// pages/api/signup.js
import { users } from "../../data/users"; // Mock data (you should use a real database)

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { fullName, email, phoneNumber, address, password } = req.body;

    // Validate the input fields
    if (!fullName || !email || !phoneNumber || !address || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Check if the email is already taken
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already exists" });
    }

    // Add the new user (for demo purposes, we're using mock data)
    const newUser = { fullName, email, phoneNumber, address, password };
    users.push(newUser);  // In a real app, you'd save this to a database

    // Respond with success
    return res.status(201).json({ success: true, message: "Account created successfully", user: newUser });
  } else {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
