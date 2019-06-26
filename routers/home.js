const Router = require('koa-router');
const controllers = require('../controllers/home');

    const router = new Router();
     router.get('/',controllers.index)
     .post('/register',controllers.register)
     .get('/login',controllers.login)
module.exports = router;