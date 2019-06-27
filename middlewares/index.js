const sendJson = require('./sendJson');
const logger = require('./log');

module.exports = (app)=>{
    app.use(logger());
    app.use(sendJson());
}