// Import necessary dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create the Post model by extending the Sequelize Model class
class Post extends Model { }

// Initialize the Post model with its attributes and configuration
Post.init(
    {
        // Define the "id" field for the post as an auto-incremented primary key
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // Define the "title" field to store the title of the post (string)
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Define the "content" field to store the content of the post (text)
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1], // Ensure the content has at least one character
            },
            defaultValue: '', // Default value for content (empty string)
        },
        // Define the "date_created" field to store the creation date of the post
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
    },
    {
        sequelize, // Pass the configured Sequelize connection
        freezeTableName: true, // Prevent pluralization of the table name
        underscored: true, // Use underscores in column names
        modelName: 'post', // Set the model name to 'post'
    }
);

// Export the Post model for use in other parts of the application
module.exports = Post;
