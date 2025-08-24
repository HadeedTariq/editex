"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MergingRequest = void 0;
const mongoose_1 = require("mongoose");
const mergingRequestSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    projectId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Project',
    },
    itemId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ProjectItem',
    },
    code: {
        type: String,
        required: true,
    },
    isChanged: {
        type: Boolean,
        default: false,
    },
});
exports.MergingRequest = (0, mongoose_1.model)('MergeRequest', mergingRequestSchema);
//# sourceMappingURL=mergingRequest.model.js.map