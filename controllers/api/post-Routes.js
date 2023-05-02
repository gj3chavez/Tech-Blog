const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
// const sequelize = require('../../config/connection');


router.get("/", (req, res) => {
  Post.findAll({
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
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  });


  router.get("/", (req, res) => {
    Post.findOne({
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
      .then((dbPostData) =>{
        if (!dbPostData) {
          res.status(404).json({ message: 'No Post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    });

    router.post("/", withAuth, (req, res) => {
      Post.create({
        title: req.body.title,
        content: req.body.post_content,
        user_id: req.session.user_id,
      })
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    });

    router.put("/:id", withAuth, (req, res) => {
      Post.update(
        {
          title: req.body.title,
          content: req.body.post_content,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
        .then((dbPostData) => {
          if (!dbPostData) {
            res.status(404).json({ message: "No Post found with this id" });
            return;
          }
          res.json(dbPostData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
      });
  
    router.delete("/:id", withAuth, (req, res) => {
      Post.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then((dbPostData) => {
          if (!dbPostData) {
            res.status(404).json({ message: "No Post found with this id" });
            return;
          }
          res.json(dbPostData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    });

  


module.exports = router;
