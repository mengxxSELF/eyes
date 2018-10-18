import 'reflect-metadata'
import { createKoaServer } from 'routing-controllers'
import views from 'koa-views'
import bodyParser from 'koa-bodyparser'
import path from 'path'
import jwtKoa from 'koa-jwt'
import { SECRET } from './config/common'
import { sequelizeObject } from './config/mysql'

const app = createKoaServer({
  controllers: [path.resolve(__dirname, `./server/*.js`)],
})

const port = 7777

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


// console.log(path.resolve(__dirname, './models/User.model'))

const pathDir = path.resolve(__dirname, './models/User.model')
console.log(pathDir)
// 链接mysql
sequelizeObject.addModels([ pathDir ])
// sequelizeObject.addModels(['./models/*..model.js'])

// app.use(main.routes())
// app.use(main.allowedMethods())

// app.on('error', (err, ctx) => {
//   console.log('server error', err, ctx)
  // })

app.listen(port, async() => {
  // await sequelize.sync({ force: true })
  console.log('the port is', port)
})

process.on('uncaughtException', err => {
  console.log(err)
  console.log(err.message)
  console.log(err.stack)
  process.exit()
})