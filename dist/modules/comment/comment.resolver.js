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
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../common/guard/auth.guard");
const typeorm_1 = require("typeorm");
const comments_entity_1 = require("../../entities/comments.entity");
const user_resolver_1 = require("../user/user.resolver");
const mongodb_1 = require("mongodb");
let CommentResolver = class CommentResolver {
    constructor(userResolver) {
        this.userResolver = userResolver;
    }
    async getCommentsByPostID(postID) {
        try {
            const comments = await typeorm_1.getMongoManager().find(comments_entity_1.CommentEntity, {
                postID
            });
            const userList = await Promise.all(comments.map(v => {
                return this.userResolver.getUserByID(v.who);
            }));
            let result = [];
            userList.map((v, k) => {
                const { _id, postID, text, time } = comments[k];
                let comment = {
                    _id,
                    who: v,
                    postID,
                    text,
                    time
                };
                result.unshift(comment);
            });
            return result;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async editOneComment(editInput) {
        try {
            const { _id, text } = editInput;
            const result = await typeorm_1.getMongoManager().findOneAndUpdate(comments_entity_1.CommentEntity, {
                _id: new mongodb_1.ObjectID(_id)
            }, {
                $set: {
                    text
                }
            });
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    async postOneComment(context, commentInput) {
        try {
            const { postID, text } = commentInput;
            const { user } = context;
            const newComment = new comments_entity_1.CommentEntity({
                who: user._id,
                postID,
                text,
                time: Date.now()
            });
            const savedResult = await typeorm_1.getMongoManager().save(comments_entity_1.CommentEntity, newComment);
            return true;
        }
        catch (error) {
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
], CommentResolver.prototype, "getCommentsByPostID", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('editInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "editOneComment", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Context()), __param(1, graphql_1.Args('commentInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "postOneComment", null);
CommentResolver = __decorate([
    graphql_1.Resolver('Comment'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [user_resolver_1.UserResolver])
], CommentResolver);
exports.CommentResolver = CommentResolver;
//# sourceMappingURL=comment.resolver.js.map