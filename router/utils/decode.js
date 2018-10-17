"use strict";
/*
 * @Author: 孟闲闲 用户密码加密解密
 * @Date: 2018-10-17 14:28:57
 * @Last Modified by: mxx
 * @Last Modified time: 2018-10-17 15:36:52
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const secret = 'mxx';
let decodeFn;
decodeFn = (password) => {
    let hmac = crypto_1.default.createHmac('md5', secret);
    return hmac.update(password).digest('base64');
};
exports.default = decodeFn;
//# sourceMappingURL=decode.js.map