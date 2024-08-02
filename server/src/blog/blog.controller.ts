import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateBlogDto } from './dtos/blog.dto';
import { Request } from 'express';

@Controller('blog')
@UseGuards(AuthGuard)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('create')
  createBlog(@Body(ValidationPipe) blog: CreateBlogDto, @Req() req: Request) {
    return this.blogService.createBlog(blog, req);
  }

  @Delete('delete')
  deleteBlog() {}

  @Get('')
  getBlogs(@Req() req: Request) {
    return this.blogService.getBlogs(req);
  }
}
