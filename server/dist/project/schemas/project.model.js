"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = exports.projectSchema = void 0;
const mongoose_1 = require("mongoose");
exports.projectSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    contributor: {
        type: [mongoose_1.Schema.Types.ObjectId],
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    public: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
exports.Project = mongoose_1.default.model('Project', exports.projectSchema);
//# sourceMappingURL=project.model.js.map