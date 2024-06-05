import { Injectable } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { Request } from 'express';
import { Item } from './schemas/folder.model';
import { CustomException } from 'src/custom.exception';

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

    console.log(projectFileAndFolders);

    return projectFileAndFolders;
  }

  async addFileToFolder(folderId: string, fileName: string) {
    const createFileInFolder = await Item.findByIdAndUpdate(folderId, {
      $push: {
        items: {
          name: fileName,
          isFolder: false,
        },
      },
    });
    if (createFileInFolder) {
      return { message: 'File created successfully' };
    } else {
      throw new CustomException('Something went wrong');
    }
  }
}
