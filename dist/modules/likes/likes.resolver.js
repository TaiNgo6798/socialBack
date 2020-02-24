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
const typeorm_1 = require("typeorm");
const likes_entity_1 = require("../../entities/likes.entity");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../common/guard/auth.guard");
const graphql_schema_1 = require("../../graphql.schema");
let LikesResolver = class LikesResolver {
    async getLikesByPostID(postID) {
        try {
            const likeList = await typeorm_1.getMongoManager().find(likes_entity_1.LikeEntity, {
                postID
            });
            console.log(likeList);
            return likeList;
        }
        catch (error) {
            return [];
        }
    }
    async likeOnePost(context, postID) {
        try {
            const { user } = context;
            const newLike = new likes_entity_1.LikeEntity({
                postID,
                who: user._id
            });
            const savedResult = await typeorm_1.getMongoManager().save(likes_entity_1.LikeEntity, newLike);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
};
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('postID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LikesResolver.prototype, "getLikesByPostID", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Context()), __param(1, graphql_1.Args('postID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LikesResolver.prototype, "likeOnePost", null);
LikesResolver = __decorate([
    graphql_1.Resolver('Likes'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard)
], LikesResolver);
exports.LikesResolver = LikesResolver;
//# sourceMappingURL=likes.resolver.js.map