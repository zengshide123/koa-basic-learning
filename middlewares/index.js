const sendJson = require('./sendJson');
const logger = require('./log');
const httpError = require('./http-error');
const path = require('path');

module.exports = (app)=>{
    app.use(httpError({
        errPageFolder:path.resolve(__dirname,"../views/error")
    }));
    app.use(logger());
    app.use(sendJson());
    // 监听中间件错误
    app.on("error", (err, ctx) => {
        if (ctx && !ctx.headerSent && ctx.status < 500) {
          ctx.status = 500
        }
        if (ctx && ctx.log && ctx.log.error) {
          if (!ctx.state.logged) {
            ctx.log.error(err.stack)
          }
        }
      }) 
}