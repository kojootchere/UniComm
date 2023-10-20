// Load environment variables from a .env file
require('dotenv').config();

// Import Sequelize
const Sequelize = require('sequelize');

// Create a Sequelize instance with the appropriate configuration
const sequelize = process.env.JAWSDB_URL
    ? new Sequelize(process.env.JAWSDB_URL) // Use JAWSDB_URL for production (e.g., Heroku)
    : new Sequelize(
        process.env.DB_NAME,          // Database name
        process.env.DB_USER,          // Database user
        process.env.DB_PASSWORD,      // Database password
        {
            host: '127.0.0.1',       // Database host (local)
            dialect: 'mysql',       // Database dialect (MySQL)
            port: 3306,             // Database port
        }
      );

// Export the sequelize instance for use in the application
module.exports = sequelize;
