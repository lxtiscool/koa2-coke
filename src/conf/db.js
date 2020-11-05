/**
 * @description 存储配置
 * @author lxt
 */
const { isProd } = require('../utils/env')

const REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  passwprd: 'root',
  port: '3306',
  database: 'coke'
}

if (isProd) {
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }

  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    passwprd: 'root',
    port: '3306',
    database: 'coke'
  }
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}