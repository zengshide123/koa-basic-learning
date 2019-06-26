const Router = require('koa-router');
const controllers = require('../controllers/home');

    const router = new Router();
     router.get('/',controllers.index)
     .post('/register',controllers.register)
     .get('/login',controllers.login)
     .get('/test',async (ctx,next)=>{
         ctx.send({
             data:123
         })
     })
module.exports = router;