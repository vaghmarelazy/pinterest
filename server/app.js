require('dotenv').config(); // Load environment variables from .env file

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Import for JWT

const indexRouter = require('./routes/index');
const usersRouter = require('./Models/users'); // Assuming users routes are in a separate file

const app = express();

// Middleware
app.use(cors({
  origin: 'https://pinterest-swm4.vercel.app', // Set the origin for CORS requests
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Set allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Set allowed headers
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'client', 'dist'))); // Serve React build

// JWT Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = decoded;
    next();
  });
};

// API routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Protected route example
app.get('/protected', verifyToken, (req, res) => {
  res.send('This is a protected route');
});

// Catch all other routes and return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({ error: res.locals.message });
});

// Ensure the app listens when run locally (development mode)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Connected to DB. Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch(err => console.error(err));

module.exports = app;
