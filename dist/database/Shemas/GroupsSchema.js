"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const groupsSchema = new mongoose_1.Schema({
    group_id: Number,
    users: [Number]
});
exports.default = groupsSchema;
//# sourceMappingURL=GroupsSchema.js.map