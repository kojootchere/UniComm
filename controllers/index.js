// Import controllers
const usersController = require('./home-routes.js');
const postsController = require('./dashboard-routes.js');
const apiRoutes = require('./api-routes.js');

const router = require('express').Router();

// ------------------------------
// Route Handling
// ------------------------------

// Use the home routes controller for routes at the root '/'
router.use('/', usersController);

// Use the API routes controller for routes under '/api'
router.use('/api', apiRoutes);

// Use the dashboard routes controller for routes under '/dashboard'
router.use('/dashboard', postsController);

module.exports = router;
