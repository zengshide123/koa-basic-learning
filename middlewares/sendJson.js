module.exports = ()=>{
    function render(data){
        this.set('Content-Type',"application/json");
        this.body = JSON.stringify(data)
    }
    return async (ctx,next)=>{
        ctx.send = render.bind(ctx);
        ctx.log.error('something me error')
        await next();
    }
}