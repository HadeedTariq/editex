"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const mongoose_1 = require("mongoose");
const itemSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    isFolder: {
        type: Boolean,
        required: true,
    },
    projectId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Project',
    },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    items: [
        {
            name: String,
            isFolder: Boolean,
        },
    ],
    code: String,
});
itemSchema.index({ name: 1, projectId: 1 }, { unique: true });
exports.Item = (0, mongoose_1.model)('Item', itemSchema);
//# sourceMappingURL=folder.model.js.map