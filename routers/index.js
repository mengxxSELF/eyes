var koa = require('koa');
var app = new koa();
var Router = require('koa-router');
var port = 6666;
var index = require('./router/index');
app.use(require('koa-static')(__dirname + '/public'));
app.use(index.routes(), index.allowedMethods());
app.on('error', function (err, ctx) {
    console.log('server error', err, ctx);
});
app.listen(port, function () {
    console.log('the port is', port);
});
process.on('uncaughtException', function (err) {
    console.log(err);
    console.log(err.message);
    console.log(err.stack);
    process.exit();
});
//# sourceMappingURL=index.js.map