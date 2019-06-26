module.exports = {
    handleGet:async (ctx,next)=>{
        await  ctx.render("index",{
            btnName:'登录'
        })
    },
    handlePost:async (ctx,next)=>{
        let {name,password} = ctx.request.body;
        if(name==="admin"&&password==="admin"){
            // ctx.response.body = `<h3>登录成功</h3>`
           await ctx.render("admin",{
                status:true
            })
        }else{
            // ctx.response.body = `<h3>用户名或密码错误</h3>`
          await  ctx.render("admin",{
                status:false
            })
        }
    }
}