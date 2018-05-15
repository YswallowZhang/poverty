const router = require('koa-router')()
const sql = require('../sql.js');
router.get('/login', async (ctx, next) => {
  await ctx.render('login', {
    title: 'Hello Koa 2!'
  })
})

router.get('/regist', async (ctx, next) => {
  await ctx.render('regist', {
    title: 'Hello Koa 2!'
  })
})

router.post('/user/regist', async (ctx, next) => {
  let data = ctx.request.body;
  let results = await sql.query("SELECT * from user where username = ?", [data.username]).then((results) => {
    return results;
  })
  if(results.length) {
    ctx.body = "用户名已存在"
  } else {
    await sql.query("INSERT INTO user SET ?", ctx.request.body)
    ctx.body = "注册已完成"
  }
})
router.post('/user/login', async (ctx, next) => {
  let data = ctx.request.body;
  let results = await sql.query("SELECT * from user where username = ?", [data.username]).then((results) => {
    return results;
  })
  if(!results.length) {
    ctx.body = "用户名不存在"
  } else if(results[0].password != data.password) {
    ctx.body = "密码错误"
  } else {
    ctx.session.userType = results[0].user_type;
    ctx.session.username = results[0].username;
    console.log(ctx.session.userType)
    ctx.body = "登陆成功"
  }
})
router.get('/user/center', async (ctx, next) => {
  let livingList = await sql.query("SELECT * from living_list where user_name = ?", [ctx.session.username]).then((results) => {
    return results;
  })
  let productList = await sql.query("SELECT * from product_list where user_name = ?", [ctx.session.username]).then((results) => {
    return results;
  })
  let hotel = await sql.query("SELECT * from hotels ").then((results) => {
    return results;
  })
  await ctx.render('user_center', {
    livingList:livingList,
    productList:productList,
    username:ctx.session.username,
    userType:ctx.session.userType,
    hotel:hotel
  })
})
module.exports = router