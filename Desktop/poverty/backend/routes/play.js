const router = require('koa-router')();
const sql = require('../sql.js');
router.get('/play', async (ctx, next) => {
  let plays =  await sql.query("select * from play").then((result) => {
    return result;
  })
  let goods =  await sql.query("select * from goods LIMIT 3").then((result) => {
    return result;
  })
  await ctx.render('play', {
    plays:plays,
    goods:goods,
    username:ctx.session.username,
    userType:ctx.session.userType
  })
})
router.get('/play/product', async (ctx, next) => {

  let goods =  await sql.query("select * from goods").then((result) => {
    return result;
  })
  await ctx.render('play_product', {
    goods:goods,
    username:ctx.session.username,
    userType:ctx.session.userType
  })
})
router.post('/play/product/buy', async (ctx, next) => {
  await sql.query("INSERT INTO product_list SET ?", ctx.request.body).then((result) => {
      
  })
  ctx.body = "购买成功"

})

module.exports = router
