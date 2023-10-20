const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// ------------------------------
// Dashboard Routes
// ------------------------------

// Render dashboard
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            attributes: ['id', 'title', 'content', 'date_created'],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        // Render the 'dashboard' view with the fetched posts
        res.render('dashboard', {
            posts,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Render edit post page
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            attributes: ['id', 'title', 'content', 'date_created'],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const post = postData.get({ plain: true });

        // Render the 'editpost' view with the fetched post
        res.render('editpost', {
            post,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Render create post page
router.get('/createpost', withAuth, (req, res) => {
    // Render the 'createpost' view for creating a new post
    res.render('createpost', {
        logged_in: true,
    });
});

// ------------------------------
// Post Creation and Comment Routes
// ------------------------------

// Create a new post
router.post('/create', (req, res) => {
    const newPost = {
        ...req.body,
        user_id: req.session.user_id
    };
    Post.create(newPost)
        .then((results) => {
            res.redirect('/dashboard');
            // res.status(201).json(results);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});

// Create a new comment on a post
router.post('/:id/addComment', (req, res) => {
    const newComment = {
        ...req.body,
        user_id: req.session.user_id,
        post_id: req.params.id
    };
    Comment.create(newComment)
        .then((results) => {
            res.redirect(`/post/${req.params.id}`);
            // res.status(201).json(results);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});

module.exports = router;
