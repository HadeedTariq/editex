import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateFolderDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsBoolean()
  isFolder: boolean;

  @IsString()
  @IsNotEmpty()
  name: string;
}
