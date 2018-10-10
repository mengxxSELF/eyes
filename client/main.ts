import * as Router from 'koa-router'
const router = new Router()

router.get('/', async ctx => {
  console.log('comoing')
  ctx.body = 'hello word'
})

export default router