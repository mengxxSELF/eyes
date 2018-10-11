import * as Router from 'koa-router'
const router = new Router()

router.get('/', async ctx => {
  await ctx.render('index')
  // ctx.body = 'hello word'
})

export default router