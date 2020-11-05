const jwt = require('jsonwebtoken')
const { SECRET } = require('../conf/constants')
const { get, set } = require('./_redis')
const KEY_PREFIX = 'wind:'

function getToken() {
  return get(`${KEY_PREFIX}token`)
}

function setToken(userInfo) {
  const token = jwt.sign(userInfo, SECRET, { expiresIn: '1h' })
  set(`${KEY_PREFIX}token`, token)
  return token
}

module.exports = {
  getToken,
  setToken
}
