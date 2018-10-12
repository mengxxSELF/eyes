import 'reflect-metadata'
import { createKoaServer } from 'routing-controllers'
import path from 'path'
// import * as views from 'koa-views'
// import * as bodyParser from 'koa-bodyparser'
// import * as path from 'path'
const app = createKoaServer({
  controllers: [path.resolve(__dirname, `./module/*.js`)],
})

const port = 7777

// 从dist目录中获取静态资源
// app.use(require('koa-static')(path.join(__dirname, '../dist')))

// app.use(views(path.join(__dirname, '../dist'), {
//   extension: 'html'
// }))

// app.use(bodyParser())

// app.use(main.routes())
// app.use(main.allowedMethods())

// app.on('error', (err, ctx) => {
//   console.log('server error', err, ctx)
// });

app.listen(port, () => {
  console.log('the port is', port)
})

process.on('uncaughtException', err => {
  console.log(err)
  console.log(err.message)
  console.log(err.stack)
  process.exit()
})