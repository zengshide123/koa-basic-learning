const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// 创建文档约束模型
const userSchema = new Schema({
       name:{
           type:String,
           required:true
       },
       email:{
           type:String,
           required:true
       },
       password:{
           type:String,
           required:true
       },
       avatar:{
           type:String
       },
       create_time:{
           type:String,
           default:Date.now
       }
  });

// 创建数据模型集合
module.exports = mongoose.model('users',userSchema);
  