const { Blog } = require('../seeds');
const sequelize = require('../config/connection');

const blogData = [
    {
        title: 'My First Blog Post',
        content: 'This is my first blog post. I am so excited to share my thoughts with the world!',
        user_id: 1
    },
    {
        title: 'My Second Blog Post',
        content: 'This is my second blog post. I am so excited to share my thoughts with the world!',
        user_id: 2
    },
    {
        title: 'My Third Blog Post',
        content: 'This is my third blog post. I am so excited to share my thoughts with the world!',
        user_id: 3
    },
    {
        title: 'My Fourth Blog Post',
        content: 'This is my fourth blog post. I am so excited to share my thoughts with the world!',
        user_id: 4
    },
    {
        title: 'My Fourth Blog Post',
        content: 'This is my fourth blog post. I am so excited to share my thoughts with the world!',
        user_id: 4
    },
    {
        title: 'My Fourth Blog Post',
        content: 'This is my fourth blog post. I am so excited to share my thoughts with the world!',
        user_id: 4
    },

];

const seedBlog = () => Blog.bulkCreate(blogData);

module.exports = seedBlog;



