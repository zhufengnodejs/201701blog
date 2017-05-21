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


