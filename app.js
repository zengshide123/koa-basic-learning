const Koa = require('koa');
const app = new Koa();
const routers = require('./routers');

// 添加 post请求数据处理
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// 路由路口
routers(app);

app.listen(3000,()=>{
    console.log(`server is running at 3000 port`);
})