import { Injectable } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { Request } from 'express';
import { ProjectItem } from './schemas/folder.model';
import { CustomException } from 'src/custom.exception';
import * as sanitize from 'mongo-sanitize';
import { Project } from 'src/project/schemas/project.model';
import { Types } from 'mongoose';

@Injectable()
export class FolderService {
  async createFolder(createFolderDto: CreateFolderDto, req: Request) {
    const { user } = req.body;
    const { name, projectId, parentId } = createFolderDto;
    const project = await Project.findOne({
      _id: projectId,
    });

    if (!project) {
      throw new CustomException('Project not found');
    }

    if (
      project.creator.toString() !== user.id &&
      !project.contributor.some((id) => id.equals(user.id))
    ) {
      throw new CustomException(
        'You are not authorized to perform this action',
      );
    }
    await ProjectItem.create({
      type: 'folder',
      name,
      projectId,
      parentId: parentId ? parentId : null,
      creatorId: user.id,
    });

    return { message: 'Folder created successfully' };
  }

  async createFile(createFileDto: CreateFolderDto, req: Request) {
    const { user } = req.body;
    const { name, projectId, parentId } = createFileDto;
    const project = await Project.findOne({
      _id: projectId,
    });

    if (!project) {
      throw new CustomException('Project not found');
    }

    if (
      project.creator.toString() !== user.id &&
      !project.contributor.some((id) => id.equals(user.id))
    ) {
      throw new CustomException(
        'You are not authorized to perform this action',
      );
    }

    await ProjectItem.create({
      type: 'file',
      name,
      projectId,
      parentId: parentId ? parentId : null,
      creatorId: user.id,
    });

    return { message: 'File created successfully' };
  }

  async getProjectFilesAndFolders(projectId: string, req: Request) {
    const user = req.body.user;
    const project = await Project.findOne({
      _id: projectId,
    });

    if (!project) {
      throw new CustomException('Project not found');
    }

    if (
      project.creator.toString() !== user.id &&
      !project.contributor.some((id) => id.equals(user.id))
    ) {
      throw new CustomException(
        'You are not authorized to access this project',
      );
    }

    const projectItems = await ProjectItem.find({ projectId }).select(`
        _id
        name
        type
        parentId
        projectId
        creatorId
        code
      `);

    const itemMap = new Map<string, any>();
    projectItems.forEach((item: any) => {
      itemMap.set(item._id.toString(), { ...item.toObject(), children: [] });
    });

    const hierarchy: any[] = [];

    projectItems.forEach((item: any) => {
      if (item.parentId) {
        const parent = itemMap.get(item.parentId.toString());
        if (parent) {
          parent.children.push(itemMap.get(item._id.toString()));
        }
      } else {
        hierarchy.push(itemMap.get(item._id.toString()));
      }
    });

    return { hierarchy, projectName: project.name, projectId: project._id };
  }

  async saveCode(code: string, fileId: string) {
    const realCode = sanitize(code);

    const savedCode = await ProjectItem.findOneAndUpdate(
      {
        _id: fileId,
        isFolder: false,
      },
      {
        code: realCode,
      },
    );
    if (!savedCode) {
      const saveFolderFileCode = await ProjectItem.updateOne(
        { 'projecProjectItems._id': fileId },
        {
          $set: { 'projecProjectItems.$.code': realCode },
        },
      );
      if (saveFolderFileCode) {
        return { message: 'Code saved successfully' };
      } else {
        throw new CustomException('Something went wrong');
      }
    } else {
      return { message: 'Code saved successfully' };
    }
  }
}
