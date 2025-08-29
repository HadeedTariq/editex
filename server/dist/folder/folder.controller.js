"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderController = void 0;
const common_1 = require("@nestjs/common");
const folder_service_1 = require("./folder.service");
const create_folder_dto_1 = require("./dto/create-folder.dto");
const auth_guard_1 = require("../auth/auth.guard");
let FolderController = class FolderController {
    constructor(folderService) {
        this.folderService = folderService;
    }
    createFolder(createFolderDto, req) {
        return this.folderService.createFolder(createFolderDto, req);
    }
    createFile(createFile, req) {
        return this.folderService.createFile(createFile, req);
    }
    saveCode({ code, fileId }) {
        return this.folderService.saveCode(code, fileId);
    }
    getProjectFilesAndFolders(id, req) {
        return this.folderService.getProjectFilesAndFolders(id, req);
    }
};
exports.FolderController = FolderController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('/createFolder'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_folder_dto_1.CreateFolderDto, Object]),
    __metadata("design:returntype", void 0)
], FolderController.prototype, "createFolder", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('/createFile'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_folder_dto_1.CreateFileDto, Object]),
    __metadata("design:returntype", void 0)
], FolderController.prototype, "createFile", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('saveCode'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FolderController.prototype, "saveCode", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], FolderController.prototype, "getProjectFilesAndFolders", null);
exports.FolderController = FolderController = __decorate([
    (0, common_1.Controller)('folder'),
    __metadata("design:paramtypes", [folder_service_1.FolderService])
], FolderController);
//# sourceMappingURL=folder.controller.js.map