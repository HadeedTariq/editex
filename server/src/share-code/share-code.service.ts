import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import mongoose, { Types } from 'mongoose';
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
    projectId: string,
  ) {
    const projects = await Project.find();

    const { user } = req.body;
    const alreadyExistedUser = await Project.findOne({
      _id: projectId,
      contributor: { $in: allowUserIds },
    }).populate('contributor', 'username');

    if (alreadyExistedUser) {
      const matched = alreadyExistedUser.contributor.filter((user) =>
        allowUserIds.includes(user._id.toString()),
      );
      const usernames = matched.map((u: any) => u.username).join(', ');
      return { message: `${usernames} already exist in contributors` };
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
          sender: user.id,
          message: 'You recieved access to code repository',
          projectId: projectId,
        });
        await newNotification.save();
      });

      return { message: 'Contributors updated Successfully' };
    } else {
      throw new CustomException('Someting went wrong');
    }
  }

  async getMyNotifications(req: Request) {
    const { user } = req.body;

    const myNotifications = await Notification.aggregate([
      {
        $match: {
          reciever: new mongoose.Types.ObjectId(user.id as string),
        },
      },
      {
        $lookup: {
          from: 'users',
          foreignField: '_id',
          localField: 'reciever',
          as: 'sender',
          pipeline: [
            {
              $project: {
                _id: 1,
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
    ]);

    return myNotifications;
  }

  async readNotification(notificationId: string, req: Request) {
    const { user } = req.body;
    const updateNotification = await Notification.findOneAndUpdate(
      {
        _id: notificationId,
        reciever: user.id,
      },
      {
        isWatch: true,
      },
    );

    if (updateNotification) {
      return { message: 'Notification readed successfully' };
    } else {
      throw new CustomException('Something went wrong');
    }
  }
}
