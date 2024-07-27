"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt");
exports.userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
    },
    avatar: {
        type: String,
        required: false,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRhtuszppVVNDg2JDHofrs55RtFKjd8I9vNU_wzl2CMA&s',
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    passion: {
        type: String,
        required: [true, 'Passion is required'],
    },
}, {
    timestamps: true,
});
exports.userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
exports.userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};
exports.User = mongoose_1.default.model('User', exports.userSchema);
//# sourceMappingURL=auth.model.js.map