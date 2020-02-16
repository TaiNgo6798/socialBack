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
const article_entity_1 = require("../../entities/article.entity");
const mongodb_1 = require("mongodb");
let PostResolver = class PostResolver {
    async articles(context) {
        const articleList = await typeorm_1.getMongoManager().find(article_entity_1.ArticleEntity, {});
        return articleList;
    }
    async getArticle(Context, id) {
        const savedResult = await typeorm_1.getMongoManager().findOne(article_entity_1.ArticleEntity, id);
        return savedResult;
    }
    async search(Context, searchText) {
        return searchText;
    }
    async addArticle(Context, article) {
        const { content, time } = article;
        const newPost = new article_entity_1.ArticleEntity({ content, time });
        const savedResult = await typeorm_1.getMongoManager().save(article_entity_1.ArticleEntity, newPost);
        return savedResult;
    }
    async deleteArticle(Context, id) {
        const res = await typeorm_1.getMongoManager().findOneAndDelete(article_entity_1.ArticleEntity, {
            _id: new mongodb_1.ObjectID(id)
        });
        return res.value ? true : false;
    }
    async updateArticle(Context, article) {
        const { _id, content, time } = article;
        const res = await typeorm_1.getMongoManager().findOneAndUpdate(article_entity_1.ArticleEntity, {
            _id: new mongodb_1.ObjectID(_id)
        }, {
            $set: {
                content,
                time
            }
        });
        return res.value ? true : false;
    }
};
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "articles", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Context()), __param(1, graphql_1.Args('articleID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getArticle", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Context()), __param(1, graphql_1.Args('searchText')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "search", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Context()), __param(1, graphql_1.Args('article')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "addArticle", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Context()), __param(1, graphql_1.Args('articleID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deleteArticle", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Context()), __param(1, graphql_1.Args('article')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updateArticle", null);
PostResolver = __decorate([
    graphql_1.Resolver(),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard)
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=article.resolver.js.map