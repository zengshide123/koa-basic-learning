const Router = require('koa-router');
const controller = require('../controllers/restful-api');
const passport = require('koa-passport')
const router = new Router({
    prefix:"/restful-api"
})
    router.get("/",controller.test)
          .post("/register",controller.register)
          .post("/login",controller.login)
          .get('/userinfo',passport.authenticate('jwt', { session: false }),controller.userinfo)

module.exports = router;
