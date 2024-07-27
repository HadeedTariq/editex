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
exports.ShareCodeController = void 0;
const common_1 = require("@nestjs/common");
const share_code_service_1 = require("./share-code.service");
const auth_guard_1 = require("../auth/auth.guard");
let ShareCodeController = class ShareCodeController {
    constructor(shareCodeService) {
        this.shareCodeService = shareCodeService;
    }
    getAllUsers(req) {
        return this.shareCodeService.getAllUsers(req);
    }
    setProjectContributors(req, { allowUserIds, projectId }) {
        return this.shareCodeService.setProjectContributors(req, allowUserIds, projectId);
    }
    getMyNotifications(req) {
        return this.shareCodeService.getMyNotifications(req);
    }
    readNotification({ notificationId }, req) {
        return this.shareCodeService.readNotification(notificationId, req);
    }
};
exports.ShareCodeController = ShareCodeController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('getAllUsers'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ShareCodeController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)('setContributors'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ShareCodeController.prototype, "setProjectContributors", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('getMyNotifications'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ShareCodeController.prototype, "getMyNotifications", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)('readNotification'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ShareCodeController.prototype, "readNotification", null);
exports.ShareCodeController = ShareCodeController = __decorate([
    (0, common_1.Controller)('share-code'),
    __metadata("design:paramtypes", [share_code_service_1.ShareCodeService])
], ShareCodeController);
//# sourceMappingURL=share-code.controller.js.map