"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = connectToDb;
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
//# sourceMappingURL=connectToDb.js.map