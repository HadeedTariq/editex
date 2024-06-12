import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Request } from 'express';
import { Project } from './schemas/project.model';
import { CustomException } from 'src/custom.exception';

@Injectable()
export class ProjectService {
  async create(createProjectDto: CreateProjectDto, req: Request) {
    const { name, public: isPublic, password } = createProjectDto;
    if (!isPublic && !password) {
      throw new CustomException('Password is required');
    }
    const { user } = req.body;

    const isProjectAlreadyExist = await Project.findOne({
      name,
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

    console.log(getProjects);

    return getProjects;
  }
}
