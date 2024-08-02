"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const sanitize = require("mongo-sanitize");
const blog_model_1 = require("./schemas/blog.model");
const custom_exception_1 = require("../custom.exception");
let BlogService = class BlogService {
    async createBlog(blog, req) {
        const user = req.body.user;
        const blogContent = sanitize(blog.content);
        const createBlog = await blog_model_1.Blog.create({
            ...blog,
            content: blogContent,
            creator: user.id,
        });
        if (createBlog) {
            return { message: 'Blog created successfully' };
        }
        else {
            throw new custom_exception_1.CustomException('Something went wrong');
        }
    }
    async getBlogs(req) {
        const user = req.body.user;
        const blogs = await blog_model_1.Blog.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'creator',
                    foreignField: '_id',
                    as: 'creator',
                    pipeline: [
                        {
                            $project: {
                                passion: 1,
                                username: 1,
                            },
                        },
                    ],
                },
            },
            {
                $unwind: '$creator',
            },
        ]);
        return blogs;
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)()
], BlogService);
//# sourceMappingURL=blog.service.js.map