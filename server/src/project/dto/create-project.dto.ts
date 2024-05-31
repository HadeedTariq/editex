import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  public: boolean;

  @IsOptional()
  @IsString()
  password: string;
}
