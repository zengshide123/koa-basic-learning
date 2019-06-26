const Koa = require('koa');
const app = new Koa();
const routers = require('./routers');
const koaNunjucks = require('koa-nunjucks-2');
const path = require('path');
const koaStatic = require('koa-static');

// 静态资源处理

app.use(koaStatic(path.join(__dirname,'static')))

// 引入模板引擎
app.use(koaNunjucks({
    ext: 'html',
    path: path.join(__dirname, 'views'),
    nunjucksConfig: {
      trimBlocks: true
    }
  }));

// 添加 post请求数据处理
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// 路由入口
routers(app);

app.listen(3000,()=>{
    console.log(`server is running at 3000 port`);
})