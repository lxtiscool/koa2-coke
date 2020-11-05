/**
 * @description 连接 redis 的方法 get set
 */

const redis = require('redis')
const { REDIS_CONF: { port, host } } = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(port, host)
redisClient.on('error', err => {
  console.error('edis error', err)
})

/**
 * redis set
 * @param {string} key key
 * @param {string} val val
 * @param {number} timeout 过期时间，单位 s
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

/**
 * redis get
 * @param {string} key key
 */
function get (key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return
      }

      try {
        resolve(
          JSON.parse(val)
        )
      } catch (e) {
        resolve(val)
      }
    })
  })
  return promise
}

module.exports = {
  set,
  get
}