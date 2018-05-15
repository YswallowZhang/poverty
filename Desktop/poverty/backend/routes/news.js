const router = require('koa-router')()
const sql = require('../sql.js');
router.get('/news', async (ctx, next) => {
  let article =  await sql.query("select * from article").then((result) => {
    return result;
  })
  await ctx.render('news', {
    article:article,
    username:ctx.session.username,
    userType:ctx.session.userType
  })
})


router.get('/news/:id', async (ctx, next) => {
    let article =  await sql.query("select * from article where id = ?;", ctx.params.id).then((result) => {
        return result;
    })
    let articles =  await sql.query("select id, article_name from article where id <> ?", ctx.params.id).then((results) => {
        return results;
    })
    await ctx.render('news_detail', {
        articles:articles,
        article:article[0],
        username:ctx.session.username,
        userType:ctx.session.userType
    })
})

module.exports = router
