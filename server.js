const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes with correct path
const signupRouter = require('./app/api/signup.js');  // Updated path
const loginRouter = require('./app/api/login.js');    // Updated path   // Updated path

// Use routes
app.use('/api', signupRouter);
app.use('/api', loginRouter);

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to DinInit Monitoring API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});