const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');


User.hasMany(Blog, {
  foreignKey: 'user_id',
});

Blog.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Blog.hasMany(Post, { 
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(Blog, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
});


module.exports = { User,Blog, Post };
