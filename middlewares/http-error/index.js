
const httpError = require('http-error');
const path = require('path');
const nunjucks = require('nunjucks');

module.exports = (opt={})=>{
    const folder = opt.errPageFolder;

    return async (ctx,next)=>{
        try {            
            await next();
            if(ctx.response.status === 404 && !ctx.response.body) ctx.throw(404);
        } catch (error) {
            let filename = 'other';
            let status = parseInt(error.status);
            const message = error.message;
            if(status>=400){
                switch (status) {
                    case 400:
                    case 404:
                    case 500:
                        filename = status;    
                        break;
                    default:
                        filename = 'default';
                        break;
                }
            }else{
                status = 500;
                filename = status;    
            }                     
            const env = opt.env || process.env.NODE_ENV || 'development'            
            const filePath =  path.join(folder, `${filename}.html`);
            nunjucks.configure( folder ? folder : __dirname )
            const data = await nunjucks.render(filePath, {
              env, 
              status: error.status || error.message, 
              error: error.message,
              stack: error.stack 
            })
            
            // 赋值给响应体
            ctx.status = status
            ctx.body = data
        }
    }
}