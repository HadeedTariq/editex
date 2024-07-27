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
let FolderService = class FolderService {
    async createFolder(createFolderDto, req) {
        const { user } = req.body;
        const { name, projectId } = createFolderDto;
        await folder_model_1.Item.create({
            isFolder: true,
            name,
            creator: user.id,
            projectId,
        });
        return { message: 'Folder created successfully' };
    }
    async createFile(createFileDto, req) {
        const { user } = req.body;
        const { name, projectId } = createFileDto;
        await folder_model_1.Item.create({
            isFolder: false,
            name,
            creator: user.id,
            projectId,
        });
        return { message: 'File created successfully' };
    }
    async getProjectFilesAndFolders(projectId) {
        const projectFileAndFolders = await folder_model_1.Item.find({
            projectId,
        }).select('name isFolder items _id code');
        return projectFileAndFolders;
    }
    async addFileToFolder(folderId, fileName) {
        const createFileInFolder = await folder_model_1.Item.findByIdAndUpdate(folderId, {
            $push: {
                items: {
                    name: fileName,
                    isFolder: false,
                },
            },
        });
        if (createFileInFolder) {
            return { message: 'File created successfully' };
        }
        else {
            throw new custom_exception_1.CustomException('Something went wrong');
        }
    }
    async saveCode(code, fileId) {
        const realCode = sanitize(code);
        const savedCode = await folder_model_1.Item.findOneAndUpdate({
            _id: fileId,
            isFolder: false,
        }, {
            code: realCode,
        });
        if (savedCode) {
            return { message: 'Code saved successfully' };
        }
        else {
            throw new custom_exception_1.CustomException('Something went wrong');
        }
    }
};
exports.FolderService = FolderService;
exports.FolderService = FolderService = __decorate([
    (0, common_1.Injectable)()
], FolderService);
//# sourceMappingURL=folder.service.js.map