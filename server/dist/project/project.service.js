"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const sanitize = require("mongo-sanitize");
const project_model_1 = require("./schemas/project.model");
const custom_exception_1 = require("../custom.exception");
const mergingRequest_model_1 = require("./schemas/mergingRequest.model");
const projectNotification_model_1 = require("./schemas/projectNotification.model");
const mongoose_1 = require("mongoose");
let ProjectService = class ProjectService {
    async create(createProjectDto, req) {
        const { name, public: isPublic, password } = createProjectDto;
        if (!isPublic && !password) {
            throw new custom_exception_1.CustomException('Password is required');
        }
        const { user } = req.body;
        const isProjectAlreadyExist = await project_model_1.Project.findOne({
            name,
            creator: user.id,
        });
        if (isProjectAlreadyExist) {
            throw new custom_exception_1.CustomException('Project already exist with this name');
        }
        await project_model_1.Project.create({
            ...createProjectDto,
            creator: user.id,
        });
        return { message: 'Project created successfully' };
    }
    async getMyProjects(req) {
        const myProjects = await project_model_1.Project.find({
            creator: req.body.user.id,
        });
        return myProjects;
    }
    async getProjectById(id, req) {
        const project = await project_model_1.Project.findOne({
            _id: id,
            creator: req.body.user.id,
        });
        return project;
    }
    async deleteMyProject(id, req) {
        const { user } = req.body;
        const deleteProject = await project_model_1.Project.findOneAndDelete({
            _id: id,
            creator: user.id,
        });
        if (deleteProject) {
            return { message: 'Project deleted successfully' };
        }
        else {
            throw new custom_exception_1.CustomException('Something went worng');
        }
    }
    async editProject(id, req) {
        const { user, name, public: isPublic, password } = req.body;
        if (!isPublic && !password) {
            throw new custom_exception_1.CustomException('Password is required');
        }
        const updateProject = await project_model_1.Project.findOneAndUpdate({
            _id: id,
            creator: user.id,
        }, {
            name,
            public: isPublic,
            password: isPublic ? null : password,
        });
        if (updateProject) {
            return { message: 'Project updated successfully' };
        }
        else {
            throw new custom_exception_1.CustomException('Something went worng');
        }
    }
    async getAllPublicProjects() {
        const getProjects = await project_model_1.Project.aggregate([
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
    async checkUserInContributors(req, projectId) {
        const { user } = req.body;
        const isUserExistInContributors = await project_model_1.Project.findOne({
            _id: projectId,
            contributor: {
                $in: user.id,
            },
        });
        if (isUserExistInContributors) {
            return { message: 'Success' };
        }
        else {
            throw new custom_exception_1.CustomException('User not exist in contributors');
        }
    }
    async mergeRequest(mergeRequest, req) {
        const { user } = req.body;
        const isUserALreadySendMergeRequest = await mergingRequest_model_1.MergingRequest.findOne({
            projectId: mergeRequest.projectId,
            fileId: mergeRequest.fileId,
            user: user.id,
            isChanged: true,
        });
        if (isUserALreadySendMergeRequest) {
            return { message: 'You already send merge request for this file' };
        }
        const createMergeRequest = await mergingRequest_model_1.MergingRequest.create({
            projectId: mergeRequest.projectId,
            code: sanitize(mergeRequest.code),
            fileId: mergeRequest.fileId,
            isChanged: true,
            user: user.id,
        });
        if (createMergeRequest) {
            await projectNotification_model_1.ProjectNotification.create({
                projectId: mergeRequest.projectId,
                fileId: mergeRequest.fileId,
                sender: user.id,
                message: 'Send a merge request',
            });
            return { message: 'Merge Request Send' };
        }
        else {
            throw new custom_exception_1.CustomException('Something went wrong');
        }
    }
    async getMyProjectsNotifications(req) {
        const { user } = req.body;
        const privateProjects = await project_model_1.Project.aggregate([
            {
                $match: {
                    creator: new mongoose_1.default.Types.ObjectId(user.id),
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
        const projectNotifications = privateProjects.filter((project) => project.projectNotifications.length > 0);
        return projectNotifications;
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)()
], ProjectService);
//# sourceMappingURL=project.service.js.map