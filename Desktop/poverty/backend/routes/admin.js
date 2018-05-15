const router = require('koa-router')()
const sql = require('../sql.js');
const fs = require('fs');

router.get('/admin', async (ctx, next) => {
    let article =  await sql.query("select * from article LIMIT 3").then((result) => {
        return result;
      })

    let pageNews = await sql.query("SELECT count(*) FROM article").then((result) => {
        return result[0]['count(*)'];
      })
    await ctx.render('admin', {
        username:ctx.session.username,
        userType:ctx.session.userType,
        article:article,
        pageNews:pageNews,
    })
})

router.post('/admin/add/news', async (ctx) => {
    const data = ctx.request.body;
    
    const row = await sql.query('INSERT INTO article VALUES(null, ?, ?, ?)', [
        data.article_name,
        data.article_time,
        data.article_detail
    ]);
    
    return ctx.body = {
        status: 200,
        msg: '上传成功'
    };
});

module.exports = router