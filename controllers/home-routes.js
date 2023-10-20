const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// ------------------------------
// Homepage and Post Routes
// ------------------------------

// Render homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        // Render the 'homepage' view with the fetched posts and user login status
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

// Render a full post with comments
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });

        const post = postData.get({ plain: true });

        // Fetch comments associated with the post
        const commentData = await Comment.findAll({
            where: { post_id: req.params.id },
            include: [
                {
                    model: User,
                    attributes: ['username', 'id'],
                },
            ],
        });

        const comment = commentData.map(comment => comment.get({ plain: true }));

        // Render the 'postFull' view with the fetched post, comments, and user login status
        res.render('postFull', {
            ...post,
            comment,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// ------------------------------
// Login and Signup Routes
// ------------------------------

// Render the login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// Render the signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;
