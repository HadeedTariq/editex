"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderService = void 0;
const common_1 = require("@nestjs/common");
const folder_model_1 = require("./schemas/folder.model");
const custom_exception_1 = require("../custom.exception");
const sanitize = require("mongo-sanitize");
const project_model_1 = require("../project/schemas/project.model");
let FolderService = class FolderService {
    async createFolder(createFolderDto, req) {
        const { user } = req.body;
        const { name, projectId, parentId } = createFolderDto;
        const project = await project_model_1.Project.findOne({
            _id: projectId,
        });
        if (!project) {
            throw new custom_exception_1.CustomException('Project not found');
        }
        if (project.creator.toString() !== user.id &&
            !project.contributor.some((id) => id.equals(user.id))) {
            throw new custom_exception_1.CustomException('You are not authorized to perform this action');
        }
        await folder_model_1.ProjectItem.create({
            type: 'folder',
            name,
            projectId,
            parentId: parentId ? parentId : null,
            creatorId: user.id,
        });
        return { message: 'Folder created successfully' };
    }
    async createFile(createFileDto, req) {
        const { user } = req.body;
        const { name, projectId, parentId } = createFileDto;
        const project = await project_model_1.Project.findOne({
            _id: projectId,
        });
        if (!project) {
            throw new custom_exception_1.CustomException('Project not found');
        }
        if (project.creator.toString() !== user.id &&
            !project.contributor.some((id) => id.equals(user.id))) {
            throw new custom_exception_1.CustomException('You are not authorized to perform this action');
        }
        await folder_model_1.ProjectItem.create({
            type: 'file',
            name,
            projectId,
            parentId: parentId ? parentId : null,
            creatorId: user.id,
        });
        return { message: 'File created successfully' };
    }
    async getProjectFilesAndFolders(projectId, req) {
        const user = req.body.user;
        const project = await project_model_1.Project.findOne({
            _id: projectId,
        });
        if (!project) {
            throw new custom_exception_1.CustomException('Project not found');
        }
        if (project.creator.toString() !== user.id &&
            !project.contributor.some((id) => id.equals(user.id))) {
            throw new custom_exception_1.CustomException('You are not authorized to access this project');
        }
        const projectItems = await folder_model_1.ProjectItem.find({ projectId }).select(`
        _id
        name
        type
        parentId
        projectId
        creatorId
        code
      `);
        const itemMap = new Map();
        projectItems.forEach((item) => {
            itemMap.set(item._id.toString(), { ...item.toObject(), children: [] });
        });
        const hierarchy = [];
        projectItems.forEach((item) => {
            if (item.parentId) {
                const parent = itemMap.get(item.parentId.toString());
                if (parent) {
                    parent.children.push(itemMap.get(item._id.toString()));
                }
            }
            else {
                hierarchy.push(itemMap.get(item._id.toString()));
            }
        });
        return { hierarchy, projectName: project.name, projectId: project._id };
    }
    async saveCode(code, fileId) {
        const realCode = sanitize(code);
        const savedCode = await folder_model_1.ProjectItem.findOneAndUpdate({
            _id: fileId,
            isFolder: false,
        }, {
            code: realCode,
        });
        if (!savedCode) {
            const saveFolderFileCode = await folder_model_1.ProjectItem.updateOne({ 'projecProjectItems._id': fileId }, {
                $set: { 'projecProjectItems.$.code': realCode },
            });
            if (saveFolderFileCode) {
                return { message: 'Code saved successfully' };
            }
            else {
                throw new custom_exception_1.CustomException('Something went wrong');
            }
        }
        else {
            return { message: 'Code saved successfully' };
        }
    }
};
exports.FolderService = FolderService;
exports.FolderService = FolderService = __decorate([
    (0, common_1.Injectable)()
], FolderService);
//# sourceMappingURL=folder.service.js.map