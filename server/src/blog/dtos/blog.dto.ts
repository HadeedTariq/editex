import { IsEnum, IsString, Max, Min } from 'class-validator';

enum BlogCategory {
  dsa = 'dsa',
  general = 'general',
  cp = 'cp',
  dp = 'dp',
}

export class CreateBlogDto {
  @IsString()
  @Min(10)
  @Max(100)
  title: string;

  @IsString()
  @Min(10)
  @Max(100)
  description: string;

  @IsString()
  @Min(10)
  @Max(100)
  content: string;

  @IsEnum(BlogCategory)
  category: BlogCategory;
}
