/**
 * @description sequelize 实例
 */
const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isPord, isTest } = require('../utils/env')

const { host, user, passwprd, database } = MYSQL_CONF

const conf = {
  host,
  dialect: 'mysql'
}

if (isTest) {
  conf.logging = () => {}
}

// 线上环境，使用连接池
if (isPord) {
  conf.pool = {
    max: 5, // 链接池中的最大连接数量
    min: 0, // 最小
    idle: 10000 // 如果一个链接池 10s 之间没有被使用，则释放
  }
}


const seq = new Sequelize(database, user, passwprd, conf)

module.exports = seq