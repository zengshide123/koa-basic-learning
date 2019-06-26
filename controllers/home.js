
const HomeService = require('../server/home');
module.exports = {
    index:async (ctx,next)=>{
        await ctx.render("home/index", {title: "iKcamp欢迎您"})
    },
    register: async function (ctx, next){
        let params = ctx.request.body
        let name = params.name
        let password = params.password
        let res = await HomeService.register(name,password)
        if(res.status == "-1"){
          await ctx.render("home/login", res.data)
        }else{
          ctx.state.title = "个人中心"
          await ctx.render("home/success", res.data)
        }
    },
    login: async(ctx, next) => {
        await ctx.render('home/login', {
          btnName: '登录'
        })
      },
}