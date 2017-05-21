let express = require('express');
let {User} = require('../model');
let multer = require('multer');
//dest表示上传的文件的存放路径
let uploads = multer({dest:'public/uploads'});
let {checkLogin,checkNotLogin} = require('../auth');
let router = express.Router();
//用户注册 /user/signup
/**
 * 注册功能如何实现
 * 1.绘制注册页面模板(username password email)
 * 2.实现提交用户注册路由 post /user/signup
 * 3.在路由中获得请求体，然后把此用户信息保存到数据库中
 * 4.保存完毕后跳转到登录页
 */
router.get('/signup',checkNotLogin,function(req,res){
    res.render('user/signup',{title:'注册'});
});
// single 当表单里只有一个上传字段的话 avatar是上传文件字段的name属性 req.file req.body
router.post('/signup',checkNotLogin,uploads.single('avatar'),function(req,res){
    let user = req.body;//请求体对象(username,password,email)
    user.avatar = `/uploads/${req.file.filename}`;
  User.create(user,function(err,doc){//_id
    if(err){//表示 注册失败
        //消息的类型是error,内容是用户注册失败
        req.flash('error','用户注册失败');
        res.redirect('back');
    }else{
        req.flash('success','用户注册成功');
        res.redirect('/user/signin');
    }
  });

});
router.get('/signin',checkNotLogin,function (req,res) {
  res.render('user/signin',{title:'登录'});
});
//用户登录
router.post('/signin',checkNotLogin,function(req,res){
  let user = req.body;//得到用户提交的登录表单
  User.findOne(user,function(err,doc){
      if(err){//如果登录查询的时候失败了
          req.flash('error','操作数据库失败');
          res.redirect('back');
      }else{
          if(doc){
              //向会话对象中写入属性 user=doc
              //存放的是数组 取出来的也是数组
              req.flash('success','用户登录成功');
              req.session.user = doc;
              res.redirect('/');
          }else{
              req.flash('error','用户或密码不正确');
              res.redirect('back');
          }
      }
  });
});
//用户退出登录
router.get('/signout',checkLogin,function (req,res) {
    req.session.user = null;
    req.flash('success','用户退出成功');
    res.redirect('/user/signin');
});
module.exports = router;

/**
 *
 req.file=
 { fieldname: 'avatar', 上传字段的名称
  originalname: '1.jpg', 上传前的原始文件名
  encoding: '7bit',
  mimetype: 'image/jpeg', 文件类型
  destination: 'public/uploads',在服务器上保存的目录
  filename: 'cc5137ab61b3f6ba72afa247865013ab',在服务器保存的文件名
  path: 'public\\uploads\\cc5137ab61b3f6ba72afa247865013ab',
  size: 129931 文件体积
  }

 req.body=
 { username: '1234', password: '1234', email: '1@1.com' }
 **/