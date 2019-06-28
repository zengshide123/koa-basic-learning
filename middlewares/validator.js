const validator = require('validator');

module.exports = () =>{
   return  async (ctx,next)=>{
        ctx.validator = validator;
        await next()
    }
}