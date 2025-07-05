require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/reviews', require('./routes/reviews'));

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to the Product Review Hub API!');
});

// Use mock database instead of MongoDB
const mockServer = require('./mockDatabase');

// The mock server is already configured and running
// No need to start another server here
console.log('✅ Using mock database server');
console.log('📱 Your React app will now show all products!');
console.log('⭐ You can register/login and add reviews');
console.log('🌐 Open http://localhost:3000 to see your app');