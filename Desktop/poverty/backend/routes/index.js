const router = require('koa-router')();
const sql = require('../sql.js');
router.get('/', async (ctx, next) => {
  let article =  await sql.query("select * from article").then((result) => {
    return result;
  })
  let plays = await sql.query("select * from play").then((result) => {
    return result;
  })
  let hotel = await sql.query("select * from hotels").then((result) => {
    return result;
  })
  console.log(ctx.session.userType,ctx.session.username)
  await ctx.render('index', {
    article:article,
    plays:plays,
    hotel:hotel,
    username:ctx.session.username,
    userType:ctx.session.userType
  })
})



module.exports = router
