import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/auth.model';
import { CustomException } from 'src/custom.exception';
import { Project } from 'src/project/schemas/project.model';
import { Notification } from './schemas/notification.model';

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

    const isUserAlreadyExistInContributors = await Project.findOne({
      _id: projectId,
      contributor: {
        $in: allowUserIds,
      },
    });

    if (isUserAlreadyExistInContributors) {
      return { message: 'These users already exist in contributors' };
    }

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

    if (updateProject) {
      Array.from({ length: allowUserIds.length }, async (_, i) => {
        const newNotification = new Notification({
          reciever: allowUserIds[i],
          sender: user.id ,
          message: 'You recieved access to code repository',
        });
        await newNotification.save();
      });

      return { message: 'Contributors updated Successfully' };
    } else {
      throw new CustomException('Someting went wrong');
    }
  }
}
