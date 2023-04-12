const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');


router.post('/create',  async (req, res) => {

    const userData = req.session.User
    try {
      const BlogPost = await Blog.create({
        title: req.body.title,
        content: req.body.content,
        user_id: userData.id,
      });
      res.status(200).json(BlogPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.post('/comment', async (req, res) => {
  const userData = req.session.User
  try {
    const userId = userData.id
    const CommentPost = await Comment.create({
      comment: req.body.comment,
      user_id: userId,
      blog_id: req.body.blog_id,
    });
    res.status(200).json(CommentPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/id', async (req, res) => {
  const userData = req.session.User
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment', 'user_id', 'blog_id'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });
    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  const allBlog = await Blog.findAll({
    include: [
      {
        model: User,
        attributes: ['id', 'username'],
      },
      {
        model: Comment,
        attributes: ['id', 'comment', 'user_id', 'blog_id'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
    ],
  });
  res.status(200).json(allBlog);
});


router.delete('/delete', async (req, res) => {
  try {
    const projectBlog = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!projectBlog) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(projectBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
