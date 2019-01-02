"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const koa_1 = __importDefault(require("koa"));
const routing_controllers_1 = require("routing-controllers");
const path_1 = __importDefault(require("path"));
const mysql_1 = require("./config/mysql");
// const koaBody = require('koa-body')
const app = new koa_1.default();
// 中间件
app.use(require('koa-static')(path_1.default.join(__dirname, '../dist')));
// app.use(
//   jwtKoa({secret: SECRET})
//   .unless({
//     path: [/\/register/, /\/login/] // 数组中的路径不需要通过jwt验证
//   })
// )
// koa 做文件上传的中间件处理  --- routing-controllers 本身已经使用了 koa-multer koa-bodyParser
// app.use(koaBody({ multipart: true }))
// this.request.files = {
//   name: 'files1',
//   file: Steam()
// }
//
// this.request.files = {
//   filename: 'files1',
//   file: Steam()
// }
routing_controllers_1.useKoaServer(app, {
    controllers: [path_1.default.resolve(__dirname, `./server/*.js`)],
});
const port = 7777;
// const port = 9097
// 从dist目录中获取静态资源
// app.use(require('koa-static')(path.join(__dirname, '../dist')))
// app.use(views(path.join(__dirname, '../dist'), {
//   extension: 'html'
// }))
// app.use(bodyParser()) --- routing-controller 中已经封装了 koa-bodyParser
// 注意这里如果写了具体的 model 文件名字就会报错  -- 很奇怪 只能用*
const pathDir = path_1.default.resolve(__dirname, './models/*.model.js');
// 链接mysql
mysql_1.sequelizeObject.addModels([pathDir]);
// Info.belongsTo(User)
// app.use(main.routes())
// app.use(main.allowedMethods())
app.on('error', (err, ctx) => {
    console.log('server error ------', err, ctx);
});
app.listen(port, async () => {
    await mysql_1.sequelizeObject.sync({ force: true });
    console.log('the port is', port);
});
process.on('uncaughtException', err => {
    console.log(err);
    console.log(err.message);
    console.log(err.stack);
    process.exit();
});
