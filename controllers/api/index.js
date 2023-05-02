const router = require('express').Router();
const userRoutes = require('./user-Routes');
const postRoutes = require ('./post-Routes');
const commentRoutes = require('./comment-Routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
