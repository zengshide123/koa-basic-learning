const sendJson = require('./sendJson');

module.exports = (app)=>{
    app.use(sendJson());
}