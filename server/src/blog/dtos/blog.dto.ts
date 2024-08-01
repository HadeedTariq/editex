import { IsEnum, IsString, IsUrl, MinLength, MaxLength } from 'class-validator';

enum BlogCategory {
  dsa = 'dsa',
  general = 'general',
  cp = 'cp',
  dp = 'dp',
}

export class CreateBlogDto {
  @IsString()
  @MinLength(10)
  @MaxLength(100)
  title: string;

  @IsString()
  @MinLength(10)
  @MaxLength(500)
  description: string;

  @IsString()
  content: string;

  @IsEnum(BlogCategory)
  category: BlogCategory;

  @IsUrl()
  @IsString()
  image: string;
}
