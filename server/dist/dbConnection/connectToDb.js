"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = connectToDb;
const mongoose_1 = require("mongoose");
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}
async function connectToDb(uri) {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = mongoose_1.default.connect(uri).then((m) => m);
    }
    try {
        cached.conn = await cached.promise;
        console.log('Connected to MongoDB');
    }
    catch (err) {
        cached.promise = null;
        console.error('Database connection error:', err);
        throw err;
    }
    return cached.conn;
}
//# sourceMappingURL=connectToDb.js.map