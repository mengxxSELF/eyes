"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const koa_views_1 = __importDefault(require("koa-views"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const path_1 = __importDefault(require("path"));
const koa_jwt_1 = __importDefault(require("koa-jwt"));
const app = routing_controllers_1.createKoaServer({
    controllers: [path_1.default.resolve(__dirname, `./client/*.js`)],
});
const port = 7777;
const SECRET = 'mxx';
// 从dist目录中获取静态资源
app.use(require('koa-static')(path_1.default.join(__dirname, '../dist')));
app.use(koa_views_1.default(path_1.default.join(__dirname, '../dist'), {
    extension: 'html'
}));
app.use(koa_bodyparser_1.default());
app.use(koa_jwt_1.default({ secret: SECRET })
    .unless({
    path: [/\/register/] // 数组中的路径不需要通过jwt验证
}));
// app.use(main.routes())
// app.use(main.allowedMethods())
// app.on('error', (err, ctx) => {
//   console.log('server error', err, ctx)
// })
app.listen(port, () => {
    console.log('the port is', port);
});
process.on('uncaughtException', err => {
    console.log(err);
    console.log(err.message);
    console.log(err.stack);
    process.exit();
});
//# sourceMappingURL=index.js.map