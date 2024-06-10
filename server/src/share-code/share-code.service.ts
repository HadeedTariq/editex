import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/auth.model';
import { CustomException } from 'src/custom.exception';
import { Project } from 'src/project/schemas/project.model';

@Injectable()
export class ShareCodeService {
  async getAllUsers(req: Request) {
    const { user } = req.body;

    const allUsers = await User.aggregate([
      {
        $match: {
          _id: { $ne: new mongoose.Types.ObjectId(user.id as string) },
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
        },
      },
    ]);

    return allUsers;
  }

  async setProjectContributors(
    req: Request,
    allowUserIds: string[],
    projectId,
  ) {
    const { user } = req.body;

    const updateProject = await Project.findOneAndUpdate(
      {
        creator: user.id,
        _id: projectId,
      },
      {
        $push: {
          contributor: {
            $each: allowUserIds,
          },
        },
      },
      { new: true },
    );

    console.log(updateProject);

    if (updateProject) {
      return { message: 'Contributors updated Successfully' };
    } else {
      throw new CustomException('Someting went wrong');
    }
  }
}
