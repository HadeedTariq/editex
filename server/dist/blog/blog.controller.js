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
exports.BlogController = void 0;
const common_1 = require("@nestjs/common");
const blog_service_1 = require("./blog.service");
const auth_guard_1 = require("../auth/auth.guard");
const blog_dto_1 = require("./dtos/blog.dto");
let BlogController = class BlogController {
    constructor(blogService) {
        this.blogService = blogService;
    }
    createBlog(blog, req) {
        return this.blogService.createBlog(blog, req);
    }
    deleteBlog() { }
};
exports.BlogController = BlogController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_dto_1.CreateBlogDto, Object]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "createBlog", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "deleteBlog", null);
exports.BlogController = BlogController = __decorate([
    (0, common_1.Controller)('blog'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogController);
//# sourceMappingURL=blog.controller.js.map