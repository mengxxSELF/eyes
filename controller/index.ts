import 'reflect-metadata'
import Koa from 'koa'
import { useKoaServer, createKoaServer } from 'routing-controllers'
import views from 'koa-views'
import bodyParser from 'koa-bodyparser'
import path from 'path'
import jwtKoa from 'koa-jwt'
import { SECRET } from './config/common'
import { sequelizeObject } from './config/mysql'
// const koaBody = require('koa-body')
const app = new Koa()


// 中间件
app.use(require('koa-static')(path.join(__dirname, '../dist')))

// app.use(
//   jwtKoa({secret: SECRET})
//   .unless({
//     path: [/\/register/, /\/login/] // 数组中的路径不需要通过jwt验证
//   })
// )

// koa 做文件上传的中间件处理  --- routing-controllers 本身已经使用了 koa-multer koa-bodyParser
// app.use(koaBody({ multipart: true }))

// this.request.files = {
//   name: 'files1',
//   file: Steam()
// }
//
// this.request.files = {
//   filename: 'files1',
//   file: Steam()
// }

useKoaServer(app, {
  controllers: [path.resolve(__dirname, `./server/*.js`)],
})

const port = 7777
// const port = 9097
// 从dist目录中获取静态资源
// app.use(require('koa-static')(path.join(__dirname, '../dist')))


// app.use(views(path.join(__dirname, '../dist'), {
//   extension: 'html'
// }))

// app.use(bodyParser()) --- routing-controller 中已经封装了 koa-bodyParser

// 注意这里如果写了具体的 model 文件名字就会报错  -- 很奇怪 只能用*
const pathDir = path.resolve(__dirname, './models/*.model.js')
// 链接mysql
sequelizeObject.addModels([ pathDir ])
// Info.belongsTo(User)

// app.use(main.routes())
// app.use(main.allowedMethods())

app.on('error', (err, ctx) => {
  console.log('server error ------', err, ctx)
})

app.listen(port, async() => {
  await sequelizeObject.sync({ force: true })
  console.log('the port is', port)
})

process.on('uncaughtException', err => {
  console.log(err)
  console.log(err.message)
  console.log(err.stack)
  process.exit()
})
