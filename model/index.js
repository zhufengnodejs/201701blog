let mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://127.0.0.1/201701blog');
// 定义用户集合的骨架模型，规定了用户集合中文档的属性和类型
let UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String
});
//定义用户模型
let User = mongoose.model('User',UserSchema);
//把用户模型挂载到导出对象上
exports.User = User;
