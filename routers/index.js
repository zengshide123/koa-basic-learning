const home = require('./home');
const restfulApi = require('./restful-api');

module.exports = function(app){
    app.use(home.routes())  
    app.use(restfulApi.routes()) 
}
