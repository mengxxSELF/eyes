"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Koa = require("koa");
const main_1 = require("./main");
const views = require("koa-views");
const path = require("path");
const app = new Koa();
const port = 7777;
// 从dist目录中获取静态资源
app.use(require('koa-static')(path.join(__dirname, '../dist')));
app.use(views(path.join(__dirname, '../dist'), {
    extension: 'html'
}));
app.use(main_1.default.routes());
app.use(main_1.default.allowedMethods());
app.on('error', (err, ctx) => {
    console.log('server error', err, ctx);
});
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