const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');

const withAuth = require('../utils/auth');

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
        attributes: ['id', 'user_id', 'comment_text', 'blog_id', 'created_at'],
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
  .then(blogData => {
    const blogs = blogData.map(blog => blog.get({ plain: true }));
    res.render('homepage', { blogs, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


router.get('/edit/:id', async (req, res) => {
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
  .then(blogData => {
    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id' });
      return;
    }

    const blog = blogData.get({ plain: true });

    res.render('single-blog', { blog, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);

    res.status(500).json(err);
  });
})

router.get('/new',(req, res) => {
  res.render('add-blog');

});




module.exports = router;