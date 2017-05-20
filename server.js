let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();
//设置模板引擎 html
app.set('view engine','html');
//指定模板的存放根目录
app.set('views',path.resolve('views'));
//指定对于html类型的模板使用ejs方法来进行渲染
app.engine('html',require('ejs').__express);
//解析客户端提交过来的请求体，并转成对象赋给req.body
app.use(bodyParser.urlencoded({extended:true}));
//此静态文件中间件会拦截到客户端对于静态文件的请求如boostap.css,然后会在当前目录的node_modules目录下寻找到文件，如果能找到则返回客户端并结束请求
app.use(express.static(path.resolve('node_modules')));
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