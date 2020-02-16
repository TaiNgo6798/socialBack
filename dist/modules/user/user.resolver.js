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
const graphql_1 = require("@nestjs/graphql");
const jwt = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../entities/user.entity");
const graphql_schema_1 = require("../../graphql.schema");
let UserResolver = class UserResolver {
    async login(loginInput) {
        const { username, password } = loginInput;
        const user = await typeorm_1.getMongoManager().findOne(user_entity_1.UserEntity, {
            username,
            password
        });
        try {
            const token = jwt.sign({ data: user }, 'taingo6798', {
                expiresIn: '24h'
            });
            return {
                status: 'success',
                message: 'Dang nhap thanh cong !',
                token
            };
        }
        catch (err) {
            return {
                status: 'failed',
                message: 'Dang nhap that bai !',
                token: ''
            };
        }
    }
    async users() {
        return typeorm_1.getMongoManager().find(user_entity_1.UserEntity, {});
    }
    async createUser(user) {
        try {
            const newUser = new user_entity_1.UserEntity(user);
            const savedRes = await typeorm_1.getMongoManager().save(user_entity_1.UserEntity, newUser);
            return true;
        }
        catch (_a) {
            return false;
        }
    }
};
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('loginInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    graphql_1.Query(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
UserResolver = __decorate([
    graphql_1.Resolver('User')
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map