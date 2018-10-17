"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import Sequelize from 'sequelize'
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
// 定义模型
const User = sequelizeObject.define('eyes_users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    password: Sequelize.INTEGER(100) // 密码
}, {
    timestamps: false
});
exports.default = User;
//# sourceMappingURL=server.js.map