import { CreateBlogDto } from './dtos/blog.dto';
import { Request } from 'express';
export declare class BlogService {
    createBlog(blog: CreateBlogDto, req: Request): Promise<{
        message: string;
    }>;
    getBlogs(req: Request): Promise<any[]>;
}
