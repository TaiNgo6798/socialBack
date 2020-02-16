"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const article_resolver_1 = require("./article.resolver");
const user_module_1 = require("../user/user.module");
let ArticleModule = class ArticleModule {
};
ArticleModule = __decorate([
    common_1.Module({
        providers: [article_resolver_1.PostResolver],
        imports: [user_module_1.UserModule]
    })
], ArticleModule);
exports.ArticleModule = ArticleModule;
//# sourceMappingURL=article.module.js.map