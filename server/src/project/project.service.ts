import { Injectable } from '@nestjs/common';
import { CreateProjectDto, MergeRequestDto } from './dto/create-project.dto';
import * as sanitize from 'mongo-sanitize';
import { Request } from 'express';
import { Project } from './schemas/project.model';
import { CustomException } from 'src/custom.exception';
import { MergingRequest } from './schemas/mergingRequest.model';
import { ProjectNotification } from './schemas/projectNotification.model';
import mongoose from 'mongoose';

@Injectable()
export class ProjectService {
  async create(createProjectDto: CreateProjectDto, req: Request) {
    const { name, public: isPublic, password } = createProjectDto;
    if (!isPublic && !password) {
      throw new CustomException('Password is required');
    }
    const { user } = req.body;

    const isProjectAlreadyExist = await Project.findOne({
      name: name.toLowerCase(),
      creator: user.id,
    });

    if (isProjectAlreadyExist) {
      throw new CustomException('Project already exist with this name');
    }

    await Project.create({
      ...createProjectDto,
      creator: user.id,
    });

    return { message: 'Project created successfully' };
  }

  async getMyProjects(req: Request) {
    const myProjects = await Project.find({
      creator: req.body.user.id,
    });
    return myProjects;
  }

  async getProjectById(id: string, req: Request) {
    const project = await Project.findOne({
      _id: id,
      creator: req.body.user.id,
    });
    return project;
  }

  async deleteMyProject(id: string, req: Request) {
    const { user } = req.body;
    const deleteProject = await Project.findOneAndDelete({
      _id: id,
      creator: user.id,
    });
    if (deleteProject) {
      return { message: 'Project deleted successfully' };
    } else {
      throw new CustomException('Something went worng');
    }
  }

  async editProject(id: string, req: Request) {
    const { user, name, public: isPublic, password } = req.body;
    if (!isPublic && !password) {
      throw new CustomException('Password is required');
    }
    const updateProject = await Project.findOneAndUpdate(
      {
        _id: id,
        creator: user.id,
      },
      {
        name,
        public: isPublic,
        password: isPublic ? null : password,
      },
    );
    if (updateProject) {
      return { message: 'Project updated successfully' };
    } else {
      throw new CustomException('Something went worng');
    }
  }

  async getAllPublicProjects() {
    const getProjects = await Project.aggregate([
      {
        $match: {
          public: true,
        },
      },
      {
        $lookup: {
          from: 'items',
          foreignField: 'projectId',
          localField: '_id',
          as: 'projectCode',
        },
      },
    ]);

    return getProjects;
  }

  async checkUserInContributors(req: Request, projectId: string) {
    const { user } = req.body;

    const isUserExistInContributors = await Project.findOne({
      _id: projectId,
      contributor: {
        $in: user.id,
      },
    });

    if (isUserExistInContributors) {
      return { message: 'Success' };
    } else {
      throw new CustomException('User not exist in contributors');
    }
  }

  async mergeRequest(mergeRequest: MergeRequestDto, req: Request) {
    const { user } = req.body;

    const isUserALreadySendMergeRequest = await MergingRequest.findOne({
      projectId: mergeRequest.projectId,
      fileId: mergeRequest.fileId,
      user: user.id,
      isChanged: true,
    });

    if (isUserALreadySendMergeRequest) {
      return { message: 'You already send merge request for this file' };
    }

    const createMergeRequest = await MergingRequest.create({
      projectId: mergeRequest.projectId,
      code: sanitize(mergeRequest.code),
      fileId: mergeRequest.fileId,
      isChanged: true,
      user: user.id,
    });

    if (createMergeRequest) {
      await ProjectNotification.create({
        projectId: mergeRequest.projectId,
        fileId: mergeRequest.fileId,
        sender: user.id,
        message: 'Send a merge request',
      });
      return { message: 'Merge Request Send' };
    } else {
      throw new CustomException('Something went wrong');
    }
  }

  async getMyProjectsNotifications(req: Request) {
    const { user } = req.body;

    const privateProjects = await Project.aggregate([
      {
        $match: {
          creator: new mongoose.Types.ObjectId(user.id as string),
          public: false,
        },
      },
      {
        $lookup: {
          from: 'projectnotifications',
          foreignField: 'projectId',
          localField: '_id',
          as: 'projectNotifications',
          pipeline: [
            {
              $lookup: {
                from: 'items',
                localField: 'fileId',
                foreignField: '_id',
                as: 'fileDetails',
                pipeline: [
                  {
                    $project: {
                      name: 1,
                      _id: 0,
                    },
                  },
                ],
              },
            },
            { $unwind: '$fileDetails' },
            {
              $lookup: {
                from: 'users',
                localField: 'sender',
                foreignField: '_id',
                as: 'sender',
                pipeline: [
                  {
                    $project: {
                      username: 1,
                      avatar: 1,
                    },
                  },
                ],
              },
            },
            {
              $unwind: '$sender',
            },
          ],
        },
      },
      {
        $project: {
          projectNotifications: 1,
          name: 1,
        },
      },
    ]);

    const projectNotifications = privateProjects.filter(
      (project) => project.projectNotifications.length > 0,
    );

    return projectNotifications;
  }
}
