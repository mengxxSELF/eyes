"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Sequelize
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = __importDefault(require("../models/User"));
// md5加密解密
const utils_1 = require("../utils");
// jwt
const utils_2 = require("../utils");
const { encodeJwt, decodeJwt } = utils_2.dealJwt;
// const sequelizeObject = new Sequelize({
//   database: 'activity',
//   dialect: 'mysql',
//   username: 'root',
//   password: '5211314mxx',
//   logging: false // 控制台不要输出 mysql 语句
//   // modelPaths: [__dirname + '/models']
// })
// 以上可以简写
const sequelizeObject = new sequelize_typescript_1.Sequelize('mysql://root:5211314mxx@127.0.0.1/activity');
sequelizeObject.addModels([path_1.default.resolve(__dirname, `../models/`)]);
let default_1 = class default_1 {
    async index(device) {
        const body = fs_1.default.readFileSync(path_1.default.resolve('dist', 'index.html'));
        return body;
    }
    /**
     * @api {get} /login 用户登录
     * @apiExample {curl} Example usage:
     *    curl -i localhost:7777/login?name=tom&password=123
     * @apiName login
     * @apiGroup users 用户组
     *
     * @apiParam {Number} name 用户名
     * @apiParam {Number} password 用户密码
     * @apiSuccess {Number} code 200 success 500 failture
    */
    async user(name, password) {
        // 密码加密处理
        const encodePwd = utils_1.encode(password);
        // 首先判断用户是否存在当前表中
        const isUser = await isExist(name);
        if (!isUser)
            return { code: 400, msg: '该用户名不存在' };
        // 判断用户名 与 密码 对应规则是否一致
        const user = await User_1.default.findOne({
            where: {
                name
            },
            attributes: ['password']
        });
        const { password: secret } = user;
        // console.log(encodePwd, 'encodePwd', secret)
        let bodyObj;
        if (encodePwd == secret) {
            bodyObj = {
                code: 200,
                messgae: '登录成功',
                jwtToken
            };
        }
        else {
            bodyObj = {
                code: 500,
                messgae: '登录失败'
            };
        }
        return bodyObj;
    }
    /**
     * @api {get} /register 用户注册
     * @apiExample {curl} Example usage:
     *    curl -i localhost:7777/register?name=tom&password=123
     * @apiName register
     * @apiGroup users 用户组
     *
     * @apiParam {Number} name 用户名
     * @apiParam {Number} password 用户密码
     * @apiSuccess {Number} code 200 success 500 failture
    */
    async insertUser(name, password) {
        // 首先判断用户是否存在当前表中
        const isUser = await isExist(name);
        if (isUser)
            return { code: 400, msg: '该用户名已存在' };
        // 密码加密处理
        const encodePwd = utils_1.encode(password);
        // 接受到 name 和  password 放入mysql库
        try {
            await User_1.default.create({
                name,
                password: encodePwd
            });
            // 生成jwt 
            const jwtToken = encodeJwt(name);
            return {
                code: 200,
                jwtToken
            };
        }
        catch (e) {
            return {
                code: 500
            };
        }
    }
};
__decorate([
    routing_controllers_1.Get('/'),
    __param(0, routing_controllers_1.HeaderParam('device')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], default_1.prototype, "index", null);
__decorate([
    routing_controllers_1.Get('/login'),
    __param(0, routing_controllers_1.QueryParam('name')),
    __param(1, routing_controllers_1.QueryParam('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], default_1.prototype, "user", null);
__decorate([
    routing_controllers_1.Get('/register'),
    __param(0, routing_controllers_1.QueryParam('name')),
    __param(1, routing_controllers_1.QueryParam('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], default_1.prototype, "insertUser", null);
default_1 = __decorate([
    routing_controllers_1.Controller()
], default_1);
exports.default = default_1;
/**
 *
 * isExist 判断该用户名字是否已经存在
 * @param {string} name
 * @returns
 */
async function isExist(name) {
    const end = await User_1.default.findOne({
        where: {
            name
        }
    });
    return end;
}
//# sourceMappingURL=main.js.map