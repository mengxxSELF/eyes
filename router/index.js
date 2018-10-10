"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const app = new Koa();
const port = 6666;
const main_1 = require("./main");
app.use(require('koa-static')(__dirname + '/public'));
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