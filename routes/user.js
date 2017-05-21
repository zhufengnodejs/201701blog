let express = require('express');
let {User} = require('../model');
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
router.post('/signup',checkNotLogin,function(req,res){
  let user = req.body;//请求体对象(username,password,email)
  User.create(user,function(err,doc){//_id
    if(err){
        res.redirect('back');
    }else{
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
      if(err){
          res.redirect('back');
      }else{
          if(doc){
              //向会话对象中写入属性 user=doc
              req.session.user = doc;
              res.redirect('/');
          }else{
              res.redirect('back');
          }
      }
  });
});
//用户退出登录
router.get('/signout',checkLogin,function (req,res) {
    req.session.user = null;
    res.redirect('/user/signin');
});
module.exports = router;