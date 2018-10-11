"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const router = new Router();
router.get('/', async (ctx) => {
    await ctx.render('index');
    // ctx.body = 'hello word'
});
exports.default = router;
//# sourceMappingURL=main.js.map