const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');


router.get("/", (req, res) => {
  Blog.findAll({
    attributes: ["id", "title", "content", "created_at"],
    order: [["created_at", "DESC"]],
    include: [{
      model: User,
      attributes: ['username']
  },
  {
    model: Comment,
    attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
    include: {
      model: User,
      attributes: ['username']
    }
  }
  ]
  })
    .then((blogData) => res.json(blogData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  });


  router.get("/", (req, res) => {
    Blog.findOne({
      attributes: ["id", "title", "content", "created_at"],
      order: [["created_at", "DESC"]],
      include: [{
        model: User,
        attributes: ['username']
    },
    {
      model: Comment,
      attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
      include: {
        model: User,
        attributes: ['username']
      }
    }
    ]
    })
      .then((blogData) =>{
        if (!blogData) {
          res.status(404).json({ message: 'No blog found with this id' });
          return;
        }
        res.json(blogData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    });

    router.post("/", withAuth, (req, res) => {
      Blog.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
      })
        .then((blogData) => res.json(blogData))
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    });

    router.put("/:id", withAuth, (req, res) => {
      Blog.update(
        {
          title: req.body.title,
          content: req.body.content,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
        .then((blogData) => {
          if (!blogData) {
            res.status(404).json({ message: "No blog found with this id" });
            return;
          }
          res.json(blogData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
      });
  
    router.delete("/:id", withAuth, (req, res) => {
      Blog.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then((blogData) => {
          if (!blogData) {
            res.status(404).json({ message: "No blog found with this id" });
            return;
          }
          res.json(blogData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    });

  


module.exports = router;
