const sequelize = require('../config/connection');
const seedUser = require('./userSeed');
const seedBlog = require('./blogSeeds');
const seedComment = require('./commentSeeds');


const seedDatabase = async() => {;
    await sequelize.sync({ force: true });
    await seedUser();
    await seedBlog();
    await seedComment();
    process.exit(0);
};

seedDatabase();
