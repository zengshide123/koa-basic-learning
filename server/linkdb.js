const mongoose = require('mongoose');
const config = require('../config');
module.exports = ()=>{
    // 连接数据库
        mongoose.connect(config.dbURL_dev,{useNewUrlParser: true});
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
        // 连接成功
        console.log('success');       
        });
}

