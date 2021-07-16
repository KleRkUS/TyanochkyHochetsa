"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const usersSchema = new mongoose_1.Schema({
    id: Number,
    chat_id: Number,
    object: Boolean,
    status: Boolean
});
exports.default = usersSchema;
//# sourceMappingURL=UsersSchema.js.map