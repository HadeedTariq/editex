import { IsEmpty, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateFolderDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsOptional() // <-- better than forcing it to be empty
  parentId?: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreateFileDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsOptional()
  parentId?: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class SaveCodeDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  fileId: string;

  @IsString()
  @IsNotEmpty()
  projectId: string;
}
