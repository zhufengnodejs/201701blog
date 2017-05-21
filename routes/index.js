let express = require('express');
let {Article} = require('../model');
//调用Router方法可以得到一个路由中间件实例
let router = express.Router();
//当客户端通过GET请求的方式访问 /路径的时候，会交由对应的函数来处理
router.get('/',function(req,res){
    let keyword = req.query.keyword;//得到关键字
    let pageNum = isNaN(req.query.pageNum)?1:parseInt(req.query.pageNum);//当前页码
    let pageSize = isNaN(req.query.pageSize)?3:parseInt(req.query.pageSize);//每页的条数
    let query = {};
    if(keyword){
        //query.title = new RegExp(keyword);// /2/
        query['$or'] = [{title:new RegExp(keyword)},
            {content:new RegExp(keyword)}];
    }
    //populate可以把一个字段从字符串转成对象
    Article.count(query,function(err,count){//总条数
        Article.find(query).sort({createAt:-1}).skip((pageNum-1)*pageSize).limit(pageSize).populate('user').exec(function(err,articles){
            //路由是相对路径，相对于模板根目录
            res.render('index',{
                title:'首页',
                keyword,//关键字
                pageNum,//当前页码
                pageSize,//每页条数
                totalPages:Math.ceil(count/pageSize),//总页数
                articles});//当前页码对应的记录
        });
    })
});
module.exports = router;
