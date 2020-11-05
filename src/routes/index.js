const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  console.log('before debugger')
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  // const session = ctx.session
  // if (session.viewNum == null) {
  //   session.viewNum = 0
  // }
  // session.viewNum++
  ctx.body = {
    title: 'koa2 json'
    // iewNum: session.viewNum
  }
})

module.exports = router
