const router = require('express').Router();

const userRoutes = require('./api/index');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', userRoutes);

module.exports = router;
