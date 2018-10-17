import 'reflect-metadata'
import { createKoaServer } from 'routing-controllers'
import views from 'koa-views'
import bodyParser from 'koa-bodyparser'
import path from 'path'
import jwtKoa from 'koa-jwt'

const app = createKoaServer({
  controllers: [path.resolve(__dirname, `./client/*.js`)],
})

const port = 7777
const SECRET = 'mxx'

// 从dist目录中获取静态资源
app.use(require('koa-static')(path.join(__dirname, '../dist')))

app.use(views(path.join(__dirname, '../dist'), {
  extension: 'html'
}))

app.use(bodyParser())

app.use(
  jwtKoa({secret: SECRET})
  .unless({
    path: [/\/register/] // 数组中的路径不需要通过jwt验证
  })
)

// app.use(main.routes())
// app.use(main.allowedMethods())

// app.on('error', (err, ctx) => {
//   console.log('server error', err, ctx)
// })

app.listen(port, () => {
  console.log('the port is', port)
})

process.on('uncaughtException', err => {
  console.log(err)
  console.log(err.message)
  console.log(err.stack)
  process.exit()
})