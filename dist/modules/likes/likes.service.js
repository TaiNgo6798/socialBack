"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const likes_entity_1 = require("../../entities/likes.entity");
let LikesService = class LikesService {
    async deleteLikesOnePost(id) {
        try {
            const res = await typeorm_1.getMongoManager().deleteMany(likes_entity_1.LikeEntity, {
                _postID: id
            });
            console.log('del likes !');
            return true;
        }
        catch (error) {
            return false;
        }
    }
};
LikesService = __decorate([
    common_1.Injectable()
], LikesService);
exports.LikesService = LikesService;
//# sourceMappingURL=likes.service.js.map