const Koa = require('koa');
const app = new Koa();

// 添加 post请求数据处理
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());


// 添加路由
const Router = require('koa-router');
const router = new Router();

      router.get('/',async (ctx,next)=>{
          let res = ctx.query;
          ctx.response.body = JSON.stringify(res);
      })
      .get('/qs',async (ctx,next)=>{
          let res = ctx.querystring;
          ctx.response.body = res;
      })
      .post('/post',async (ctx,next)=>{
          let res = ctx.request.body;
          ctx.response.body = res;
      })

      app.use(router.routes());



app.listen(3000,()=>{
    console.log(`server is running at 3000 port`);
})