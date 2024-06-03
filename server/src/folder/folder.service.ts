import { Injectable } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { Request } from 'express';
import { Item } from './schemas/folder.model';

@Injectable()
export class FolderService {
  async createFolder(createFolderDto: CreateFolderDto, req: Request) {
    const { user } = req.body;
    const { name, projectId } = createFolderDto;
    await Item.create({
      isFolder: true,
      name,
      creator: user.id,
      projectId,
    });

    return { message: 'Folder created successfully' };
  }

  async createFile(createFileDto: CreateFolderDto, req: Request) {
    const { user } = req.body;
    const { name, projectId } = createFileDto;
    await Item.create({
      isFolder: false,
      name,
      creator: user.id,
      projectId,
    });

    return { message: 'File created successfully' };
  }

  async getProjectFilesAndFolders(projectId: string) {
    const projectFileAndFolders = await Item.find({
      projectId,
    }).select('name isFolder items _id');

    return projectFileAndFolders;
  }

  update(id: number, updateFolderDto: UpdateFolderDto) {
    return `This action updates a #${id} folder`;
  }

  remove(id: number) {
    return `This action removes a #${id} folder`;
  }
}
