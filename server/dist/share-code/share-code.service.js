"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareCodeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const auth_model_1 = require("../auth/schema/auth.model");
const custom_exception_1 = require("../custom.exception");
const project_model_1 = require("../project/schemas/project.model");
const notification_model_1 = require("./schemas/notification.model");
let ShareCodeService = class ShareCodeService {
    async getAllUsers(req) {
        const { user } = req.body;
        const allUsers = await auth_model_1.User.aggregate([
            {
                $match: {
                    _id: { $ne: new mongoose_1.default.Types.ObjectId(user.id) },
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
    async setProjectContributors(req, allowUserIds, projectId) {
        const { user } = req.body;
        const isUserAlreadyExistInContributors = await project_model_1.Project.findOne({
            _id: projectId,
            contributor: {
                $in: allowUserIds,
            },
        });
        if (isUserAlreadyExistInContributors) {
            return { message: 'These users already exist in contributors' };
        }
        const updateProject = await project_model_1.Project.findOneAndUpdate({
            creator: user.id,
            _id: projectId,
        }, {
            $push: {
                contributor: {
                    $each: allowUserIds,
                },
            },
        }, { new: true });
        if (updateProject) {
            Array.from({ length: allowUserIds.length }, async (_, i) => {
                const newNotification = new notification_model_1.Notification({
                    reciever: allowUserIds[i],
                    sender: user.id,
                    message: 'You recieved access to code repository',
                    projectId: projectId,
                });
                await newNotification.save();
            });
            return { message: 'Contributors updated Successfully' };
        }
        else {
            throw new custom_exception_1.CustomException('Someting went wrong');
        }
    }
    async getMyNotifications(req) {
        const { user } = req.body;
        const myNotifications = await notification_model_1.Notification.aggregate([
            {
                $match: {
                    reciever: new mongoose_1.default.Types.ObjectId(user.id),
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
    async readNotification(notificationId, req) {
        const { user } = req.body;
        const updateNotification = await notification_model_1.Notification.findOneAndUpdate({
            _id: notificationId,
            reciever: user.id,
        }, {
            isWatch: true,
        });
        if (updateNotification) {
            return { message: 'Notification readed successfully' };
        }
        else {
            throw new custom_exception_1.CustomException('Something went wrong');
        }
    }
};
exports.ShareCodeService = ShareCodeService;
exports.ShareCodeService = ShareCodeService = __decorate([
    (0, common_1.Injectable)()
], ShareCodeService);
//# sourceMappingURL=share-code.service.js.map