// Import the User, Post, and Comment models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Define associations between models using Sequelize's association methods

// A User can have many Posts
User.hasMany(Post, {
    foreignKey: 'user_id', // The foreign key in the Post model that references User's id
    onDelete: 'CASCADE', // If a user is deleted, also delete their associated posts
});

// A Post belongs to a User
Post.belongsTo(User, {
    foreignKey: 'user_id', // The foreign key in the Post model that references User's id
});

// A Comment belongs to a User
Comment.belongsTo(User, {
    foreignKey: 'user_id', // The foreign key in the Comment model that references User's id
});

// A Comment belongs to a Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id', // The foreign key in the Comment model that references Post's id
});

// A User can have many Comments
User.hasMany(Comment, {
    foreignKey: 'user_id', // The foreign key in the Comment model that references User's id
});

// A Post can have many Comments
Post.hasMany(Comment, {
    foreignKey: 'post_id', // The foreign key in the Comment model that references Post's id
});

// Export the User, Post, and Comment models along with their associations
module.exports = { User, Post, Comment };
