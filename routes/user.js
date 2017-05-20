let express = require('express');
let router = express.Router();
//用户注册 /user/signup
router.get('/signup',function(req,res){
  res.send('用户注册');
});
router.get('/signin',function (req,res) {
  res.send('用户登录');
});
router.get('/signout',function (req,res) {
    res.send('用户退出');
});
module.exports = router;