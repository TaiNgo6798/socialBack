"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_service_1 = require("./app.service");
const dish_module_1 = require("./modules/dish/dish.module");
const graphql_1 = require("@nestjs/graphql");
const user_module_1 = require("./modules/user/user.module");
const path_1 = require("path");
const article_module_1 = require("./modules/article/article.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mongodb',
                database: 'lunchtest',
                url: `mongodb+srv://taingo:taingo6798@cluster0-tjufa.mongodb.net/test?retryWrites=true&w=majority`,
                entities: [path_1.join(__dirname, '**/**.entity{.ts,.js}')],
                synchronize: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            }),
            dish_module_1.DishModule,
            graphql_1.GraphQLModule.forRoot({
                typePaths: ['./**/*.graphql'],
                context: ({ req }) => ({ req })
            }), user_module_1.UserModule, article_module_1.ArticleModule
        ],
        controllers: [],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map