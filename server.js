let express = require('express');
let app = express();
let index = require('./routes/index');
let user = require('./routes/user');
let article = require('./routes/article');
app.use('/',index);
//当客户端请求过来的路径是 /user开头的话，会交由user中间件来处理 /user/signup /user/signin
/**
 * / 首页
 * /user/signup 注册
 * /user/signin 登录
 * /user/signout 退出
 * /article/add 发表文章
 */
app.use('/user',user);
app.use('/article',article);
app.listen(8080);