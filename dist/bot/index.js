"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = __importDefault(require("./commands"));
const vk_io_1 = require("vk-io");
// const token: string = process.env.VK_ACCESS_TOKEN || '';
const token = 'f8d4dcee297ed9bd8a30a61d3c3f501fbcb2deeda2d7a036a15a8c9d0d5978064d660e4fac8612c9a3664';
// const groupId: string = process.env.GROUP_ID;
const createBot = (models) => {
    const vk = new vk_io_1.VK({
        token: token,
    });
    commands_1.default(vk, models);
    return vk;
};
exports.default = createBot;
//# sourceMappingURL=index.js.map