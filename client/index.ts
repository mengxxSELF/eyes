import * as Koa from 'koa'
const app = new Koa()
const port = 6666
import main from './main'

app.use(require('koa-static')(__dirname + '/public'))

app.use(main.routes())
app.use(main.allowedMethods())

app.on('error', (err, ctx) => {
  console.log('server error', err, ctx)
});

app.listen(port, () => {
  console.log('the port is', port)
})

process.on('uncaughtException', err => {
  console.log(err)
  console.log(err.message)
  console.log(err.stack)
  process.exit()
})