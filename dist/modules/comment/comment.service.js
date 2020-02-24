"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const comments_entity_1 = require("../../entities/comments.entity");
const typeorm_1 = require("typeorm");
let CommentService = class CommentService {
    async deleteCommentOnePost(id) {
        try {
            const res = await typeorm_1.getMongoManager().deleteMany(comments_entity_1.CommentEntity, {
                postID: id
            });
            console.log('del comment !');
            return true;
        }
        catch (error) {
            return false;
        }
    }
};
CommentService = __decorate([
    common_1.Injectable()
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map