/*
 * @Author: 孟闲闲  在此定义所需的表结构
 * @Date: 2018-10-18 11:19:01 
 * @Last Modified by: mxx
 * @Last Modified time: 2018-10-18 11:27:39
 */
// import {Sequelize} from 'sequelize'
const Sequelize = require("sequelize")

const sequelizeObject = new Sequelize('activity', 'root', '5211314mxx', {
  host: 'localhost',    //数据库地址,默认本机
  port: '3306',
  dialect: 'mysql',
  pool: {   //连接池设置
    max: 5, //最大连接数
    min: 0, //最小连接数
    idle: 10000
  },
})

// 定义模型 User
export const User = sequelizeObject.define('eyes_users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: Sequelize.STRING(100), // 用户名
  password: Sequelize.INTEGER(100) // 密码
}, {
  timestamps: false
})

// 定义 Info
export const Info = sequelizeObject.define('eyes_info', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  userId: Sequelize.NUMBER,
  brethday: Sequelize.STRING
}, {
  timestamps: true,
})

