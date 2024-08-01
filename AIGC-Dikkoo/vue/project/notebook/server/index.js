const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors');
const { bodyParser } = require('@koa/bodyparser'); 

const userRouter = require('./routes/user.js');

app.use(cors()); // 允许跨域
app.use(bodyParser()); // 让koa可以解析post传递的参数

app.use(userRouter.routes(), userRouter.allowedMethods()); // 引入与用户相关的接口

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
})

// 使用 `npx nodemon index.js` 启动服务器