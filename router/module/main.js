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
const sql_1 = __importDefault(require("../config/sql"));
let default_1 = class default_1 {
    async index(device) {
        const body = fs_1.default.readFileSync(path_1.default.resolve('dist', 'index.html'));
        return body;
    }
    async user() {
        const sql = `select * from eyes_users`;
        const end = await sql_1.default(sql);
        console.log(end, 'end');
        return {
            code: 200
        };
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], default_1.prototype, "user", null);
default_1 = __decorate([
    routing_controllers_1.Controller()
], default_1);
exports.default = default_1;
//# sourceMappingURL=main.js.map