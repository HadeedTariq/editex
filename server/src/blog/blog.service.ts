import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dtos/blog.dto';
import { Request } from 'express';

import * as sanitize from 'mongo-sanitize';
import { Blog } from './schemas/blog.model';
import { CustomException } from 'src/custom.exception';

@Injectable()
export class BlogService {
  async createBlog(blog: CreateBlogDto, req: Request) {
    const user: any = req.body.user;

    const blogContent = sanitize(blog.content);

    const createBlog = await Blog.create({
      ...blog,
      content: blogContent,
      creator: user.id,
    });

    if (createBlog) {
      return { message: 'Blog created successfully' };
    } else {
      throw new CustomException('Something went wrong');
    }
  }
}
