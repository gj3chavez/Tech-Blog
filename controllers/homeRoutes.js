const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');


router.get('/', async (req, res) => {
  console.log(req.session);

  Blog.findAll({
    attributes: [
      'id', 
      'title',
      'content',
      'created_at'],
    include: [
      {
        model: Comment,
        attributes: ['username', 'comment_text', 'blog_id', 'created_at'],
        include: {
        model: User,
        attributes: ['username']
        }
      },

      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbBlogData => {
    const blogs = dbBlogData.map(blog => blog.get({ plain: true }));
    res.render('homepage', { blogs, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


router.get('/login', async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/blog/:id', async (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'content',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbBlogData => {
    if (!dbBlogData) {
      res.status(404).json({ message: 'No blog found with this id' });
      return;
    }

    const blog = dbBlogData.get({ plain: true });

    res.render('single-blog', { blog, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);

    res.status(500).json(err);
  });
});

router.get('/blog', async (req, res) => {
  Blog.findAll({
    attributes: [
      'id',
      'title',
      'content',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbBlogData => {
    const blogs = dbBlogData.map(blog => blog.get({ plain: true }));
    res.render('blog', { blogs, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/signup', async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});



module.exports = router;
