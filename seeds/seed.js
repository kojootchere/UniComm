// Import required modules and models
const sequelize = require('../config/connection'); // Sequelize connection
const { User, Post } = require('../models'); // User and Post models

// Import JSON data containing user and post information
const userData = require('./user-seeds.json'); // User data
const postData = require('./post-seeds.json'); // Post data

// Define an asynchronous function for seeding the database
const seedDatabase = async () => {
    // Synchronize the database, dropping existing tables and creating new ones
    await sequelize.sync({ force: true });

    // Bulk insert user data into the User model's table
    // - individualHooks: true enables the use of model hooks (e.g., password hashing)
    // - returning: true ensures that the inserted user data is returned as an array
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    // Bulk insert post data into the Post model's table
    const posts = await Post.bulkCreate(postData);

    // Exit the process after seeding the database
    process.exit(0);
};

// Call the seedDatabase function to start the seeding process
seedDatabase();
