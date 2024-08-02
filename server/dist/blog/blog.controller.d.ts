import { BlogService } from './blog.service';
import { CreateBlogDto } from './dtos/blog.dto';
import { Request } from 'express';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    createBlog(blog: CreateBlogDto, req: Request): Promise<{
        message: string;
    }>;
    deleteBlog(): void;
    getBlogs(req: Request): Promise<any[]>;
}
