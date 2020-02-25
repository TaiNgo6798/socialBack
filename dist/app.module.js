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
const graphql_1 = require("@nestjs/graphql");
const user_module_1 = require("./modules/user/user.module");
const path_1 = require("path");
const jwt = require("jsonwebtoken");
const post_module_1 = require("./modules/post/post.module");
const comment_module_1 = require("./modules/comment/comment.module");
const file_module_1 = require("./file/file.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mongodb',
                database: 'social_app',
                url: `mongodb+srv://taingo:taingo6798@cluster0-tjufa.mongodb.net/test?retryWrites=true&w=majority`,
                entities: [path_1.join(__dirname, '**/**.entity{.ts,.js}')],
                synchronize: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            }),
            graphql_1.GraphQLModule.forRoot({
                typePaths: ['./**/*.graphql'],
                context: ({ req, connection }) => {
                    if (connection) {
                        return {
                            req: connection.context
                        };
                    }
                    return ({ req });
                },
                installSubscriptionHandlers: true,
                subscriptions: {
                    onConnect: (params, ws) => {
                        try {
                            const token = params['Authorization'].split(' ')[1];
                            const decodedObj = jwt.verify(token, 'taingo6798');
                            return decodedObj;
                        }
                        catch (err) {
                            console.log(err);
                            return false;
                        }
                    }
                }
            }),
            user_module_1.UserModule,
            post_module_1.PostModule,
            comment_module_1.CommentModule,
            file_module_1.FileModule
        ],
        controllers: [],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map