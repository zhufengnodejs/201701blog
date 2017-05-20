let express = require('express');
let router = express.Router();
//  /article/add
router.get('/add',function(req,res){
 res.send('发表文章');
});
// module model
module.exports = router;