const router = require('koa-router')()
const sql = require('../sql.js');
router.get('/hotel', async (ctx, next) => {
    let hotel =  await sql.query("select * from hotels").then((result) => {
        return result;
      })
    let food =  await sql.query("select * from food").then((result) => {
        return result;
    })
     await ctx.render('hotel', {
          hotel:hotel,
          food:food,
          username:ctx.session.username,
          userType:ctx.session.userType
      })
  
})
router.get('/hotel/:id', async (ctx, next) => {
    let hotel =  await sql.query("select * from hotels where id = ?", ctx.params.id).then((result) => {
        return result;
      })
      
      await ctx.render('hotel_detail', {
          hotel:hotel[0],
          username:ctx.session.username,
          userType:ctx.session.userType
      })
  
})
router.post('/hotel/buy', async (ctx, next) => {
    await sql.query("INSERT INTO living_list SET ?", ctx.request.body).then((result) => {
        
    })
    ctx.body = "预定成功"
  
})
module.exports = router
