"use strict";
/*
 * @Author: 孟闲闲 链接mysql库
 * @Date: 2018-10-18 14:59:36
 * @Last Modified by: mxx
 * @Last Modified time: 2018-10-18 20:13:31
 */
Object.defineProperty(exports, "__esModule", { value: true });
// import { MysqlConfig } from 'sql'
// const mysqlConfig: MysqlConfig = {
//   dialect: 'mysql', // mysql
//   host: ['127.0.0.1'], // 网址ip
//   port: 3306,  // 端口
//   user: 'root',  // 用户
//   password: '5211314mxx', // 密码
//   database: 'activity', // 数据库
//   // 连接池的一些相关配置
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
//   // logging: false // 控制台不要输出 mysql 语句
//   // modelPaths: [__dirname + '/models']
// }
const sequelize_typescript_1 = require("sequelize-typescript");
// export const sequelizeObject = new Sequelize({
//   database: 'activity',
//   dialect: 'mysql',
//   username: 'root',
//   password: '5211314mxx',
//   // modelPaths: [ __dirname + './models' ]
// })
// 以上可以简写
exports.sequelizeObject = new sequelize_typescript_1.Sequelize('mysql://root:5211314mxx@127.0.0.1/activity');
//# sourceMappingURL=mysql.js.map