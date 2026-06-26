"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = exports.projectSchema = void 0;
const mongoose_1 = require("mongoose");
exports.projectSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 1,
        maxlength: 100,
    },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    contributor: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    password: {
        type: String,
    },
    public: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
exports.projectSchema.index({
    creator: 1,
    name: 1,
}, {
    unique: true,
});
exports.projectSchema.index({
    creator: 1,
});
exports.projectSchema.index({
    contributor: 1,
});
exports.Project = mongoose_1.default.model('Project', exports.projectSchema);
//# sourceMappingURL=project.model.js.map