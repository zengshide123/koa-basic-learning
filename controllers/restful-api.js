const Users = require('../server/user');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('../config');
const saltRounds = 10;

module.exports = {
    test: async (ctx,next)=>{
        await ctx.render("home/index", {title: "iKcamp欢迎您"})
    },
    register: async (ctx,next)=>{
        let {name,password,email} = ctx.request.body;    
        try {
           let res = await Users.countDocuments({email})
           if(!res){
                password = await bcrypt.hash(password, saltRounds); 
           let avatar = await gravatar.url('aadfas@163.com', {s: '200', r: 'pg', d: 'mm'});    
             let data = await Users.create({
                 name,password,email,avatar
             });
                ctx.send({
                    code:0,
                    msg:"邮箱有效"
                })
           }else{
               ctx.send({
                   code:-1,
                   msg:"该邮箱已被注册"
               })
           }   
        } catch (error) {
            ctx.log.error('db register wrong')   
        }
    },
    login: async (ctx,next)=>{
        let {name,password,email} = ctx.request.body;        
        try {
            let len = await Users.countDocuments({email});
                if(len){
                    let res = await Users.find({email});
                    let isAuth = await bcrypt.compare(password, res[0].password);
                    if(isAuth){
                        let payload = {id:res[0].id,name:res[0].name,avatar:res[0].avatar};
                        let token = jwt.sign(payload,config.tokenSecret,{ expiresIn: 60 * 60 })
                        ctx.send({
                            code:0,
                            msg:'登录成功',
                            token:`bearer ${token}`
                        })
                    }else{
                        ctx.send({
                            code:-1,
                            msg:"密码错误"
                        })
                    }
                }else{
                    ctx.send({
                        code:-1,
                        msg:'用户不存在'
                    })
                }
        } catch (error) {
            
        }
    },
    userinfo: async (ctx,next)=>{       
        ctx.body = ctx.state.user;
    }
}