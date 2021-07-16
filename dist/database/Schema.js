"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const groupsSchema = new mongoose_1.Schema({
    group_id: Number,
    users: {
        name: String,
        status: Boolean
    }
});
exports.default = groupsSchema;
//# sourceMappingURL=Schema.js.map