/**
 * @description user controller
 */

const { getUserInfo, createUser, deleteUser } = require('../services/user')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')
const { setToken } = require('../cache/user')

/**
  * 用户名是否存在
  * @param {string} userName 用户名
  */
async function isExist (userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }
  // 业务逻辑处理 (无)
  // 调用 services 获取数据
  // 统一返回格式
}

/**
 * 注册
 * @param {*} userName 
 */
async function register({ userName, password, nickName }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new ErrorModel(registerUserNameExistInfo)
  }

  // 注册 service
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      nickName
    })
    return new SuccessModel()
  } catch (e) {
    console.error(e.message, e.stack)
    return new ErrorModel(registerFailInfo)
  }
}

/**
 * 登录
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
  // 获取用户信息
  const userInfo = await getUserInfo(userName, doCrypto(password))
  
  if (!userInfo) {
    // 登录失败
    return new ErrorModel(loginFailInfo)
  }

    // 加密 userInfo
  // const token = jwt.sign(userInfo, SECRET, { expiresIn: '1h' })
  const token = setToken(userInfo)
  // console.log(ctx.session, userInfo)
  // // 登录成功
  // if (ctx.session.userInfo == null) {
  //   ctx.session.userInfo = userInfo
  // }

  return new SuccessModel({
    token,
    data: userInfo
  })
}

/**
 * 删除当前用户
 * @param {string} userName 用户名
 */
async function deleteCurUser(userName) {
  const result = await deleteUser(userName)
  if (result) {
    // 成功
    return new SuccessModel()
  }
  // 失败
  return new ErrorModel(deleteUserFailInfo)
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser
}
