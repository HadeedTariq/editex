import { Injectable } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { Request } from 'express';
import { Item } from './schemas/folder.model';
import { CustomException } from 'src/custom.exception';
import * as sanitize from 'mongo-sanitize';
import { User } from 'src/auth/schema/auth.model';
import mongoose from 'mongoose';

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
    }).select('name isFolder items _id code');

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
      return { message: `File in ${createFileInFolder.name} created successfully` };
    } else {
      throw new CustomException('Something went wrong');
    }
  }

  async saveCode(code: string, fileId: string) {
    const realCode = sanitize(code);

    
    const savedCode = await Item.findOneAndUpdate(
      {
        _id: fileId,
        isFolder: false,
      },
      {
        code: realCode,
      },
    );
    if(!savedCode){
      const saveFolderFileCode=await Item.updateOne({"items._id":fileId},{
        $set:{"items.$.code":realCode}
      })
      if(saveFolderFileCode){
        return {message:"Code saved successfully"}
      }else{
        throw new CustomException("Something went wrong")
      }
    } else{
      return {message:"Code saved successfully"}
    }
  }
}
