const Router = require('koa-router');
const controllers = require('../controllers/home');

    const router = new Router();
     router.get('/',controllers.handleGet)
     .post('/login',controllers.handlePost)
     .get('/test',async (ctx,next)=>{
         ctx.response.body = 123
     })

module.exports = router;