// Import necessary dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create the Comment model by extending the Sequelize Model class
class Comment extends Model {}

// Initialize the Comment model with its attributes and configuration
Comment.init(
    {
        // Define the "id" field for the comment as an auto-incremented primary key
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // Define the "comment_text" field to store the comment text
        comment_text: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1], // Ensure the comment text has at least one character
            },
        },
        // Define the "date_created" field to store the creation date of the comment
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, // Default value is the current timestamp
        },
        // Define the "user_id" field as a foreign key referencing the "id" field in the "user" model
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user', // Referencing the "user" model
                key: 'id', // Referencing the "id" field in the "user" model
            },
        },
        // Define the "post_id" field as a foreign key referencing the "id" field in the "post" model
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post', // Referencing the "post" model
                key: 'id', // Referencing the "id" field in the "post" model
            },
        },
    },
    {
        sequelize, // Pass the configured Sequelize connection
        freezeTableName: true, // Prevent pluralization of the table name
        underscored: true, // Use underscores in column names
        modelName: 'comment', // Set the model name to 'comment'
    }
);

// Export the Comment model for use in other parts of the application
module.exports = Comment;
