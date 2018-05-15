const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session');

const index = require('./routes/index')
const user = require('./routes/user')
const hotel = require('./routes/hotel')
const play = require('./routes/play')
const news = require('./routes/news')
const admin = require('./routes/admin')

// error handler
onerror(app)

app.keys = ['asffasfsaFASU~!*@@*__++sadfs'];

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))
app.use(session({
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true, 
  signed: true, 
  rolling: false, 
  renew: false, 

}, app))
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(hotel.routes(), hotel.allowedMethods())
app.use(news.routes(), news.allowedMethods())
app.use(play.routes(), play.allowedMethods())
app.use(admin.routes(), admin.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
