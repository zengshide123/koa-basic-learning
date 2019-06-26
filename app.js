const Koa = require('koa');
const app = new Koa();

// 添加路由
const Router = require('koa-router');
const router = new Router();

// 基本路由 
router.get('/',async (ctx,next)=>{
            ctx.response.body = `<h1>Index page</h1>`
        })
       .get('/home',async (ctx,next)=>{
            ctx.response.body = `<h1>Home page</h1>`
        })
       .get('/about',async (ctx,next)=>{
            ctx.response.body = `<h1>About page</h1>`
        })
        .all('/*',async (ctx,next)=>{
            ctx.response.status = 404;
            ctx.response.body = `<h1>404 Not Found</h1>`;
            await next()
        })
app.use(router.routes())

// 命名路由
const user = new Router();
user.get('user','/users/:id',async (ctx,next)=>{
    ctx.response.body = `<h1>user page</h1>`
})
console.log('userURL',user.url('user',3));
console.log('userURL',user.url('user',{id:3}));
app.use(user.routes())

// 路由多中间件处理
const multimid = new Router();
      multimid.get('/multimid',async (ctx,next)=>{
        ctx.state.msg = `<h1>multimid page</h1>`;
        await next();
      },async (ctx,next)=>{
        ctx.response.body = ctx.state.msg;
      })
app.use(multimid.routes())





app.listen(3000,()=>{
    console.log(`server is running at 3000 port`);
})