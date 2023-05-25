
const sequelize = require('../config/connection');
const seedUser = require('./userSeeds');
const seedPost = require('./postSeeds');
const seedComment = require('./commentSeeds');


const seedDatabase = async() => {;
    await sequelize.sync({ force: true });
    await seedUser();
    await seedPost();
    await seedComment();
    process.exit(0);
};

seedDatabase();
