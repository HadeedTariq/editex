import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FolderService } from './folder.service';
import { CreateFileDto, CreateFolderDto } from './dto/create-folder.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @UseGuards(AuthGuard)
  @Post('/createFolder')
  createFolder(
    @Body(ValidationPipe) createFolderDto: CreateFolderDto,
    @Req() req: Request,
  ) {
    return this.folderService.createFolder(createFolderDto, req);
  }

  @UseGuards(AuthGuard)
  @Post('/createFile')
  createFile(
    @Body(ValidationPipe) createFile: CreateFileDto,
    @Req() req: Request,
  ) {
    return this.folderService.createFile(createFile, req);
  }

  @UseGuards(AuthGuard)
  @Post('saveCode')
  saveCode(@Body() { code, fileId }: { code: string; fileId: string }) {
    return this.folderService.saveCode(code, fileId);
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  getProjectFilesAndFolders(@Param('id') id: string, @Req() req: Request) {
    return this.folderService.getProjectFilesAndFolders(id, req);
  }
}
