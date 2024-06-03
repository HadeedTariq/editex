import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FolderService } from './folder.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
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
    @Body(ValidationPipe) createFile: CreateFolderDto,
    @Req() req: Request,
  ) {
    return this.folderService.createFile(createFile, req);
  }

  @Get(':id')
  getProjectFilesAndFolders(@Param('id') id: string) {
    return this.folderService.getProjectFilesAndFolders(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFolderDto: UpdateFolderDto) {
    return this.folderService.update(+id, updateFolderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.folderService.remove(+id);
  }
}
