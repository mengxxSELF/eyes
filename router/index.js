"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const path_1 = __importDefault(require("path"));
const koa_jwt_1 = __importDefault(require("koa-jwt"));
const common_1 = require("./config/common");
const mysql_1 = require("./config/mysql");
const app = routing_controllers_1.createKoaServer({
    controllers: [path_1.default.resolve(__dirname, `./server/*.js`)],
});
const port = 7777;
// const port = 9097
// 从dist目录中获取静态资源
app.use(require('koa-static')(path_1.default.join(__dirname, '../dist')));
// app.use(views(path.join(__dirname, '../dist'), {
//   extension: 'html'
// }))
app.use(koa_bodyparser_1.default());
app.use(koa_jwt_1.default({ secret: common_1.SECRET })
    .unless({
    path: [/\/register/, /\/login/] // 数组中的路径不需要通过jwt验证
}));
// 注意这里如果写了具体的 model 文件名字就会报错  -- 很奇怪 只能用*
const pathDir = path_1.default.resolve(__dirname, './models/*.model.js');
// 链接mysql
mysql_1.sequelizeObject.addModels([pathDir]);
// Info.belongsTo(User)
// app.use(main.routes())
// app.use(main.allowedMethods())
// app.on('error', (err, ctx) => {
//   console.log('server error', err, ctx)
// })
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
//# sourceMappingURL=index.js.map