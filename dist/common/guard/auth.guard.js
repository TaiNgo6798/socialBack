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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const user_service_1 = require("../../modules/user/user.service");
const jwt = require("jsonwebtoken");
let GqlAuthGuard = class GqlAuthGuard {
    constructor(userService) {
        this.userService = userService;
    }
    async canActivate(context) {
        try {
            const gqlCtx = graphql_1.GqlExecutionContext.create(context);
            const { authorization } = gqlCtx.getContext().req.headers;
            const decodedObj = jwt.verify(authorization.split(' ')[1], 'taingo6798');
            gqlCtx.getContext().user = decodedObj;
            return true;
        }
        catch (err) {
            return false;
        }
    }
};
GqlAuthGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], GqlAuthGuard);
exports.GqlAuthGuard = GqlAuthGuard;
//# sourceMappingURL=auth.guard.js.map