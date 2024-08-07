"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectNotification = void 0;
const mongoose_1 = require("mongoose");
const projectNotificationSchema = new mongoose_1.Schema({
    projectId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Project',
    },
    message: {
        type: String,
        required: true,
    },
    fileId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Item',
    },
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
});
exports.ProjectNotification = (0, mongoose_1.model)('ProjectNotification', projectNotificationSchema);
//# sourceMappingURL=projectNotification.model.js.map