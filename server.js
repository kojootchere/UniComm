// Import required modules and libraries
const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Create an Express application instance
const app = express();

// Define the port number to listen on (use process.env.PORT or 3001 if not set)
const PORT = process.env.PORT || 3000;

// Create an instance of Handlebars for templating
const hbs = exphbs.create({
    helpers: {
        // Helper function to format a date using specified options
        formatDate: function (date) {
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true  // Display the time in 12-hour format
            };
            return new Date(date).toLocaleDateString(undefined, options);
        },
        
        // Custom Handlebars helper for conditional rendering
        'if_eq': function (a, b, opts) {
            if (a === b) {
                return opts.fn(this);
            } else {
                return opts.inverse(this);
            }
        }
    }
});

// Define session configuration
const sess = {
    secret: process.env.SESSION_SECRET, // Use a secret string from environment variables
    cookie: { maxAge: 1000 * 60 * 60 }, // Set session expiration time (1 hour in milliseconds)
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize, // Connect session data to your Sequelize database
    }),
};

// Use the defined session configuration
app.use(session(sess));

// Configure Handlebars as the template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Serve static files from the "public" directory
app.use(express.static("public"));

// Enable JSON and URL-encoded request body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the specified directory
app.use(express.static(path.join(__dirname, "public")));

// Include the defined routes
app.use(routes);

// Synchronize Sequelize models with the database (force: false won't drop tables)
sequelize.sync({ force: false }).then(() => {
    // Start the Express server, and listen on the defined port
    app.listen(PORT, () => console.log("Now listening"));
});
