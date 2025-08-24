"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectItem = void 0;
const mongoose_1 = require("mongoose");
const projectItemSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['file', 'folder'], required: true },
    parentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ProjectItem',
        default: null,
    },
    projectId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Project', required: true },
    creatorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    code: { type: String },
}, { timestamps: true });
projectItemSchema.index({ name: 1, parentId: 1, projectId: 1 }, { unique: true });
exports.ProjectItem = (0, mongoose_1.model)('ProjectItem', projectItemSchema);
//# sourceMappingURL=folder.model.js.map