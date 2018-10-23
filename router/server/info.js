"use strict";
/*
 * @Author: 孟闲闲 - 补充身份信息
 * @Date: 2018-10-18 16:49:45
 * @Last Modified by: mxx
 * @Last Modified time: 2018-10-19 18:39:18
 */
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
// 使用Info模型处理
const models_1 = require("../models");
// uid
let default_1 = class default_1 {
    async add(info) {
        const { id: userId, birthday } = info;
        // console.log(userId, birthday)
        // 增加数据 或者 调整
        let body;
        await models_1.Info.upsert({
            birthday,
            userId
        }, {
            fields: ['birthday']
        }).then(() => {
            body = { code: 200, message: 'success' };
        }).catch(() => {
            body = { code: 500, message: 'failture' };
        });
        console.log(body);
        return body;
    }
    async info(name) {
        // 根据用户名 查询用户基本信息
        // 连表查询 - 用户名 查id 根据id查birthday
        await models_1.Info.findOne({ include: [models_1.User] }).then((res) => {
            console.log(res);
        });
        return { code: 200 };
    }
    /**
     * @api {get} /group 获取用户参与组
     * @apiExample {curl} Example usage:
     *    curl -i localhost:7777/group/2
     * @apiName remove
     * @apiGroup users 用户组
     *
     * @apiSuccess {Number} code 200 success 500 failture
    */
    async group(groupid) {
        // 连表查询
    }
};
__decorate([
    routing_controllers_1.Post('/info'),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], default_1.prototype, "add", null);
__decorate([
    routing_controllers_1.Get('/userinfo/:name'),
    __param(0, routing_controllers_1.Params()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], default_1.prototype, "info", null);
__decorate([
    routing_controllers_1.Get('/group/:groupid'),
    __param(0, routing_controllers_1.Params('groupid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], default_1.prototype, "group", null);
default_1 = __decorate([
    routing_controllers_1.Controller()
], default_1);
exports.default = default_1;
//# sourceMappingURL=info.js.map