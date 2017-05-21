//进入路由之前要求此用户未登录，如果未登录的话可继续访问路由，如果已登录，则跳回首页，提示已经登录
exports.checkNotLogin = function(req,res,next){
   if(req.session.user){//如果已登录
      res.redirect('/');//跳回首页
   }else{
       next();//继续访问
   }
}
//如果要求此路由登录后才能访问，则会判断当前的登录状态，如果已登录，则正常继续访问，如果未登录，则跳回登录页
exports.checkLogin = function(req,res,next){
   if(req.session.user){//如果已登录
       next();//继续访问
   }else{
       res.redirect('/user/signin');//重定向到登录页
   }
}