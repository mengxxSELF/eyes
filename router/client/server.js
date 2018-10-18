"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: 孟闲闲  在此定义所需的表结构
 * @Date: 2018-10-18 11:19:01
 * @Last Modified by: mxx
 * @Last Modified time: 2018-10-18 11:27:39
 */
// import {Sequelize} from 'sequelize'
const Sequelize = require("sequelize");
const sequelizeObject = new Sequelize('activity', 'root', '5211314mxx', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});
// 定义模型 User
exports.User = sequelizeObject.define('eyes_users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    password: Sequelize.INTEGER(100) // 密码
}, {
    timestamps: false
});
// 定义 Info
exports.Info = sequelizeObject.define('eyes_info', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    userId: Sequelize.NUMBER,
    brethday: Sequelize.STRING
}, {
    timestamps: true,
});
//# sourceMappingURL=server.js.map