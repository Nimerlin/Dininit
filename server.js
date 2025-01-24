const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes with correct path
const signupRouter = require('./app/api/signup.js');  
const loginRouter = require('./app/api/login.js');    
const paymentRouter = require('./app/api/payment.js');
const verifyPaymentRouter = require('./app/api/verify-subscription.js');
const ticketRouter = require('./app/api/ticket.js');
const viewTicketsRouter = require('./app/api/view-tickets.js');
// Use routes
app.use('/api', signupRouter);
app.use('/api', loginRouter);
app.use('/api', paymentRouter);
app.use('/api', verifyPaymentRouter);
app.use('/api', ticketRouter);
app.use('/api', viewTicketsRouter);
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