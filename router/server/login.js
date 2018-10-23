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
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
// import cons from 'consolidate'
// Sequelize - model
const models_1 = require("../models");
// md5加密解密
const utils_1 = require("../utils");
// jwt
const utils_2 = require("../utils");
const { encodeJwt, decodeJwt } = utils_2.dealJwt;
// text/html  直接修改文件的content-type 类型
let default_1 = class default_1 {
    async index(device) {
        console.log('// COMBAK: ');
        // console.log(path.resolve(__dirname, '../../dist/index.html'))
        // return cons.swig(path.resolve(__dirname, '../../dist/index.html'))
        // const body = fs.readFileSync(path.resolve('dist', 'index.html'))
        // const body = fs.readFileSync(path.resolve('dist', 'index.html'), 'utf-8')
        // return body
        // return 200
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
        const user = await models_1.User.findOne({
            where: {
                name
            },
            attributes: ['password']
        });
        const { password: secret } = user;
        // console.log(encodePwd, 'encodePwd', secret)
        let bodyObj;
        if (encodePwd == secret) {
            // 生成jwt
            const jwtToken = encodeJwt(name);
            bodyObj = {
                code: 200,
                message: '登录成功',
                jwtToken
            };
        }
        else {
            bodyObj = {
                code: 500,
                message: '登录失败'
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
        let bodyObj;
        try {
            await models_1.User.create({
                name,
                password: encodePwd
            });
            // 生成jwt
            const jwtToken = encodeJwt(name);
            bodyObj = {
                code: 200,
                message: '注册成功',
                jwtToken
            };
        }
        catch (e) {
            bodyObj = {
                code: 500,
                message: '注册失败'
            };
        }
        return bodyObj;
    }
    /**
     * @api {get} /remove 用户注销信息
     * @apiExample {curl} Example usage:
     *    curl -i localhost:7777/remove/1
     * @apiName remove
     * @apiGroup users 用户组
     *
     * @apiSuccess {Number} code 200 success 500 failture
    */
    async remove(id) {
        console.log('wwww  ------- wwww', id, typeof id);
        let body;
        await models_1.User.destroy({
            where: { id }
        }).then(() => {
            body = { code: 200, message: 'success' };
        }).then(() => {
            body = { code: 500, message: 'failture' };
        });
        return body;
    }
};
__decorate([
    routing_controllers_1.Get('/'),
    routing_controllers_1.ContentType('text/html'),
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
__decorate([
    routing_controllers_1.Get('/remove/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], default_1.prototype, "remove", null);
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
    const end = await models_1.User.findOne({
        where: {
            name
        }
    });
    return end;
}
//# sourceMappingURL=login.js.map