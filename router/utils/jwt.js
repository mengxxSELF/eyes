"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: 孟闲闲   jwt 加密解密
 * @Date: 2018-10-17 19:31:26
 * @Last Modified by: mxx
 * @Last Modified time: 2018-10-17 19:41:49
 */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
const SECRET = 'mxx';
/**
 * encodeJwt 生成jwt
 *
 * @param {string} username
 */
const encodeJwt = (username) => {
    let expTime = moment_1.default().add(50, 'minutes').unix();
    let token = jsonwebtoken_1.default.sign({
        name: username,
        exp: expTime
    }, SECRET);
    return token;
};
/**
 * decodeJwt 解密jwt
 *
 * @param {string} username
 */
const decodeJwt = (token) => {
    let result = jsonwebtoken_1.default.verify(token, SECRET);
    let exp = result.exp;
    // 当前时间戳
    const nowTime = moment_1.default().unix();
    if (exp < nowTime) {
        // 已过期
        return false;
    }
    return result;
};
exports.default = {
    encodeJwt,
    decodeJwt
};
//# sourceMappingURL=jwt.js.map