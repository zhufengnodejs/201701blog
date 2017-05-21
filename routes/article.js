let express = require('express');
let {checkLogin,checkNotLogin} = require('../auth');
let router = express.Router();
//  /article/add
router.get('/add',checkLogin,function(req,res){
    res.render('article/add',{title:'发表文章'});
});
// module model
module.exports = router;