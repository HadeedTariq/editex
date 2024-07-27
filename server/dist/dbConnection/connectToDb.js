"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = void 0;
const mongoose_1 = require("mongoose");
async function connectToDb(uri) {
    try {
        await (0, mongoose_1.connect)(uri);
        console.log('connected to db');
    }
    catch (err) {
        console.log(err);
        process.exit(0);
    }
}
exports.connectToDb = connectToDb;
//# sourceMappingURL=connectToDb.js.map