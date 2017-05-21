let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
//消息提示中间件 flash 闪光 一闪而过
let flash = require('connect-flash');
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
app.use(express.static(path.resolve('public')));
//在使用了此会话中间件之后，会在请求对象上增加req.session属性
app.use(session({
    resave:true,//每次客户端请求到服务器都会保存session
    secret:'zfpx',//用来加密cookie
    cookie:{
      maxAge:3600*1000 //指定cookie的过期时间
    },
    saveUninitialized:true, //保存未初始化的session
    store:new MongoStore({
        url:require('./config').dbUrl
    })
}));
//切记此中间件的使用要放在session的后面，因为此中间件是需要依赖session的 req.flash(type,msg) req.flash(type)
app.use(flash());
let index = require('./routes/index');
let user = require('./routes/user');
let article = require('./routes/article');
app.use(function (req,res,next) {
    //真正渲染模板的是res.locals
    res.locals.user = req.session.user;
    res.locals.keyword = '';
    //flash的功能是读完一次之后会立刻清空数据
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});
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