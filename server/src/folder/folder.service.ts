import { Injectable } from '@nestjs/common';
import { CreateFolderDto, SaveCodeDto } from './dto/create-folder.dto';
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

  async saveCode({ code, fileId, projectId }: SaveCodeDto, req: Request) {
    try {
      const user = req.body.user;
      const realCode = sanitize(code);

      const project = await Project.findOne({ _id: projectId });
      if (!project) {
        throw new CustomException('Project not found');
      }

      if (
        project.creator.toString() !== user.id &&
        !project.contributor.some((id) => id.equals(user.id))
      ) {
        throw new CustomException(
          'You are not authorized to change the code of the project',
        );
      }

      const file = await ProjectItem.findOneAndUpdate(
        { _id: new Types.ObjectId(fileId), type: 'file' },
        { code: realCode },
        { new: true },
      );

      if (!file) {
        throw new CustomException('File not found');
      }

      return { message: 'Code saved successfully' };
    } catch (error) {
      if (error instanceof CustomException) {
        throw error; // rethrow your domain-specific exceptions
      }
      console.log(error);

      throw new CustomException(
        'An unexpected error occurred while saving code',
      );
    }
  }

  async executeCode({ code }: { code: string }) {
    try {
      const realCode = sanitize(code);
      const compilerApiKey = process.env.COMPILER_API_KEY;

      const response = await fetch(
        'https://api.onlinecompiler.io/api/run-code-sync/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: compilerApiKey!,
          },
          body: JSON.stringify({
            compiler: 'typescript-deno',
            code: realCode,
            input: '',
          }),
        },
      );

      if (!response.ok) {
        throw new CustomException('Failed to execute code');
      }

      const data = await response.json();

      // The console output / result is stored in data.output
      return data;
    } catch (error) {
      if (error instanceof CustomException) {
        throw error;
      }
      throw new CustomException(
        'An unexpected error occurred while saving code',
      );
    }
  }
}
