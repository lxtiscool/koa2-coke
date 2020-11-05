const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)
const { SECRET } = require('../conf/constants')
const { register, login } = require('../controller/user')
const { loginCheck } = require('../middlewares/loginChecks')

router.prefix('/users')

// 登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})

// 注册路由
router.post('/register', async (ctx, next) => {
  const { userName, password, nickName } = ctx.request.body
  ctx.body = await register({
    userName,
    password,
    nickName
  })
})

// 获取用户信息
router.get('/getUserInfo', loginCheck, async (ctx, next) => {
  const token = ctx.header.authorization
  try {
    const payload = await verify(token.split(' ')[1], SECRET)
    ctx.body = {
      errno: 0,
      userInfo: payload
    }
  } catch (e) {
    ctx.body = {
      errno: -1,
      umsg: 'verify token failed'
    }
  }
})

module.exports = router
