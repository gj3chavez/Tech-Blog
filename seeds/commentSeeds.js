const { Comment } = require('../models');
const sequelize = require('../config/connection');

const commentData = [
    {
        comment_text: 'This is my first comment. I am so excited to share my thoughts with the world!',
        user_id: 1,
        blog_id: 1
    },
    {
        comment_text: 'This is my second comment. I am so excited to share my thoughts with the world!',
        user_id: 2,
        blog_id: 2
    },
    {
        comment_text: 'This is my third comment. I am so excited to share my thoughts with the world!',
        user_id: 3,
        blog_id: 3
    },
    {
        comment_text: 'This is my fourth comment. I am so excited to share my thoughts with the world!',
        user_id: 4,
        blog_id: 4
    },
    {
        comment_text: 'This is my fourth comment. I am so excited to share my thoughts with the world!',
        user_id: 4,
        blog_id: 4
    },
    {
        comment_text: 'This is my fourth comment. I am so excited to share my thoughts with the world!',
        user_id: 4,
        blog_id: 4
    },

];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;

