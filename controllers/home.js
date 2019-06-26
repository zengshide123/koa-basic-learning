module.exports = {
    handleGet:async (ctx,next)=>{
        ctx.response.body = `home index page`
    },
    handlePost:async (ctx,next)=>{
        ctx.response.body = `请求数据为${JSON.stringify(ctx.request.body)}`
    }
}