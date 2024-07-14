// Import necessary modules.
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const uploadRoutes = require('./routes/uploadRoutes');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors());

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up view engine
app.set('views', path.join(__dirname, 'views')); // Set the directory for views
app.set('view engine', 'jade'); // Set the view engine to 'jade'

// Middleware for logging, parsing requests, and serving static files
app.use(logger('dev')); // Use morgan for logging requests in the 'dev' format
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded request bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// Static folder for uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Define routes
app.use('/api', uploadRoutes);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)); // Create a 404 error and pass it to the next middleware (error handler)
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error details in development
  res.locals.message = err.message; // Set the error message
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // Set the error object if in development

  // Render the error page
  res.status(err.status || 500); // Set the response status code
  res.render('error'); // Render the 'error' view
});

// Export the app module
module.exports = app;