# 新建一个项目
```
npm init -y
```
这个命令会创建一个package.json文件

# 安装依赖的模块
```
npm install body-parser  cookie-parser debug ejs express morgan se
rve-favicon express-session connect-mongo mongoose connect-flash multer async bootstrap --save
```
- --save-dev =  -D
- --save = -S

# 创建并初始git
```
git init
git add -A
git commit -m"1. 初始化项目和依赖的模块"
git remote add origin https://github.com/zhufengnodejs/201701blog.git
git push origin master
```

# 创建服务
express + mongoose
```javascript
let express = require('express');
let app = express();

app.listen(8080);
```

# 跑通路由

# 引入模板引擎

# 编写步骤
----
1. 初始化项目和依赖的模块
2. 跑通路由
3. 使用bootstrap渲染模板
4. 实现用户注册的功能
5. 实现用户的登录功能
6. 实现会话功能并控制菜单显示
7. 增加登录状态判断中间件
8. 成功和失败时的消息提示
9. 实现上传头像并在导航的右上角显示个人信息
   1. 在注册表单增加一个头像的字段
   2. 给表单增加一个属性 `enctype="multipart/form-data"`
   3. 在`user`路由中引入**multer**中间件,并在注册请求中用此中间件解析请求体得到`req.file`和`req.body`
   4. 拼出avatar图片路径并赋给req.body对象
   5. 在User模型中添加avatar属性
10. 新增发表文章
11. 首页显示文章列表
12. 编写文章详情页
13. 删除文章
14. 更新文章
15. 实现搜索功能
16. 实现分页的功能