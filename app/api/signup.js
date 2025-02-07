const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27018";
const client = new MongoClient(uri);

router.post('/signup', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        await client.connect();
        const database = client.db('dininit_monitoring');
        const users = database.collection('users');

        // Check if user already exists
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with user_level
        const newUser = {
            name,
            email,
            phone,
            password: hashedPassword,
        //    user_level: 'normal_user', // Default user level
            createdAt: new Date()
        };

        const result = await users.insertOne(newUser);
        console.log('Inserted user:', result);
        
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        await client.close();
    }
});

module.exports = router;