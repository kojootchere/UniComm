// Import necessary dependencies
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// Create the User model by extending the Sequelize Model class
class User extends Model {
  // Method to check if a provided password matches the user's hashed password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initialize the User model with its attributes and configuration
User.init(
  {
    // Define the "id" field for the user as an auto-incremented primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the "username" field to store the username (string)
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the "email" field to store the email address (string)
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure email addresses are unique
      validate: {
        isEmail: true, // Validate that the input is an email address
      },
    },
    // Define the "password" field to store the hashed password (string)
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Validate that the password has at least 8 characters
      },
    },
  },
  {
    // Use hooks to hash the password before creating a new user
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10); // Hash the password with bcrypt
        return newUserData;
      },
    },
    sequelize, // Pass the configured Sequelize connection
    timestamps: false, // Disable timestamps for created and updated at fields
    freezeTableName: true, // Prevent pluralization of the table name
    underscored: true, // Use underscores in column names
    modelName: 'user', // Set the model name to 'user'
  }
);

// Export the User model for use in other parts of the application
module.exports = User;
