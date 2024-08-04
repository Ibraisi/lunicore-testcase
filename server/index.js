// Import required modules
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Import custom configurations and utilities
const dbconfig = require('./config/dbConfig');
const seedDatabase = require('./config/seedDatabase');
const authRoutes = require('./routes/authRoute');
const mainRoutes = require('./routes/mainRoute')

// Initialize express app
const app = express();

// Set up CORS options
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true,
  optionSuccessStatus: 200
};

// Middleware setup
app.use(cors(corsOptions));  // Enable CORS for all routes
app.use(express.json());  // Parse JSON request bodies
app.use(cookieParser());  // Parse cookies
app.use(express.urlencoded({ extended: false }));  // Parse URL-encoded request bodies

// Set up routes
app.use('/', authRoutes);
app.use('/', mainRoutes);


// Define port for the server
const PORT = process.env.PORT || 5000;

// Async function to start the server
const startServer = async () => {
  try {
    // Initialize database connection
    await dbconfig.initialize();
    console.log("Database connection has been initialized!");

    // Seed the database with initial data
    await seedDatabase(dbconfig);
    console.log("Database seeded successfully!");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error during server startup:", error);
  }
};

// Start the server
startServer();