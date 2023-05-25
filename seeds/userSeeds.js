const { User} = require('../models');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

const userData = [
    {
        username: 'Miranda_Moore',
        email: 'miranda_moore@test.com',
        password: 'test'
    },
    {
        username: 'Giuliana_Chavez',
        email: 'giuliana_r@test.com',
        password: 'test'
    },
    {
        username: 'Giuliana_Chavez',
        email: 'giuliana_r@test.com',
        password: 'test'
    },
    {
        username: 'Giuliana_Chavez',
        email: 'giuliana_r@test.com',
        password: 'test'
    },
    {
        username: 'Giuliana_Chavez',
        email: 'giuliana_r@test.com',
        password: 'test'
    },

];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
    
        


