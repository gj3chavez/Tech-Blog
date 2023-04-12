const { User} = require('../models');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

const userData = [
    {
        username: 'Miranda_Moore',
        email: 'miranda_moore@gmail.com',
        password: 'password123'
    },
    {
        username: 'Giuliana_Chavez',
        email: 'giuliana_r@gmail.com',
        password: 'password123'
    },
    {
        username: 'Giuliana_Chavez',
        email: 'giuliana_r@gmail.com',
        password: 'password123'
    },
    {
        username: 'Giuliana_Chavez',
        email: 'giuliana_r@gmail.com',
        password: 'password123'
    },
    {
        username: 'Giuliana_Chavez',
        email: 'giuliana_r@gmail.com',
        password: 'password123'
    },

];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
    
        


