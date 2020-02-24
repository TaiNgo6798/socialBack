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
const typeorm_1 = require("typeorm");
let CommentEntity = class CommentEntity {
    constructor(args) {
        Object.assign(this, args);
    }
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", String)
], CommentEntity.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CommentEntity.prototype, "who", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CommentEntity.prototype, "postID", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CommentEntity.prototype, "text", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], CommentEntity.prototype, "time", void 0);
CommentEntity = __decorate([
    typeorm_1.Entity({
        name: 'comments'
    }),
    __metadata("design:paramtypes", [Object])
], CommentEntity);
exports.CommentEntity = CommentEntity;
//# sourceMappingURL=comments.entity.js.map