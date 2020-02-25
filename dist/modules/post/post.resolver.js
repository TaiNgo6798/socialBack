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
const post_entity_1 = require("../../entities/post.entity");
const mongodb_1 = require("mongodb");
const comment_service_1 = require("../comment/comment.service");
let PostResolver = class PostResolver {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async posts(context) {
        const postList = await typeorm_1.getMongoManager().find(post_entity_1.PostEntity, {});
        return postList;
    }
    async getOnePost(Context, _id) {
        try {
            const savedResult = await typeorm_1.getMongoManager().findOne(post_entity_1.PostEntity, _id);
            return savedResult;
        }
        catch (error) {
            return null;
        }
    }
    async likeAPost(context, postID) {
        try {
            const { user } = context;
            const post = await typeorm_1.getMongoManager().findOne(post_entity_1.PostEntity, { _id: new mongodb_1.ObjectID(postID) });
            let likes = post.likes || [];
            if (likes.indexOf(user._id) !== -1) {
                likes = [...likes.filter(v => v !== user._id)];
            }
            else {
                likes = [...likes, user._id];
            }
            const result = await typeorm_1.getMongoManager().findOneAndUpdate(post_entity_1.PostEntity, {
                _id: new mongodb_1.ObjectID(postID)
            }, {
                $set: {
                    likes: likes
                }
            });
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    async addPost(Context, post) {
        try {
            const { user } = Context;
            const { content, image } = post;
            const newPost = new post_entity_1.PostEntity({
                who: user._id,
                image,
                content,
                time: Date.now()
            });
            const savedResult = await typeorm_1.getMongoManager().save(post_entity_1.PostEntity, newPost);
            return true;
        }
        catch (error) {
            return null;
        }
    }
    async deletePost(Context, id) {
        try {
            const res = await Promise.all([
                this.commentService.deleteCommentOnePost(id),
                typeorm_1.getMongoManager().findOneAndDelete(post_entity_1.PostEntity, {
                    _id: new mongodb_1.ObjectID(id)
                })
            ]);
            return (res[1].value) ? true : false;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
    async updatePost(Context, post) {
        try {
            const { _id, content } = post;
            const res = await typeorm_1.getMongoManager().findOneAndUpdate(post_entity_1.PostEntity, {
                _id: new mongodb_1.ObjectID(_id)
            }, {
                $set: {
                    content,
                    time: Date.now()
                }
            });
            return res.value ? true : false;
        }
        catch (error) {
            return false;
        }
    }
};
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "posts", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Context()), __param(1, graphql_1.Args('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getOnePost", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Context()), __param(1, graphql_1.Args('postID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "likeAPost", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Context()), __param(1, graphql_1.Args('post')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "addPost", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Context()), __param(1, graphql_1.Args('postID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Context()), __param(1, graphql_1.Args('post')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updatePost", null);
PostResolver = __decorate([
    graphql_1.Resolver('Post'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=post.resolver.js.map