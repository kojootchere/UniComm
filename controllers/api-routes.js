const express = require('express');
const { User, Post, Comment } = require('../models');

const router = express.Router();

// ------------------------------
// User Routes
// ------------------------------

// Get all users
router.get('/users', async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single user by id
router.get('/users/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    if (!userData) {
      res.status(404).json({ message: 'No user found with that id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a user
router.put('/users/:id', async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!userData[0]) {
      res.status(404).json({ message: 'No user found with that id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: 'No user found with that id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ------------------------------
// Authentication Routes (Login, Logout, Signup)
// ------------------------------

// User login route
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// User logout route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// User signup route
router.post('/signup', async (req, res) => {
  try {
    const signupData = await User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    });
    if (!signupData) {
      return res.json({ message: 'This is not a valid sign up' });
    }

    req.session.save(() => {
      req.session.user_id = signupData.id;
      res.json({
        user: signupData,
        message: 'You successfully made an account. Try logging in!',
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// ------------------------------
// Post Routes (Update and Delete)
// ------------------------------

// Update a post
router.put('/posts/:id', async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!postData[0]) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post
router.delete('/posts/:id', (req, res) => {
  Post.destroy({ where: { id: req.params.id } })
    .then((results) => {
      res.status(201).json(results);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
