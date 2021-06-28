"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_vk_bot_api_1 = __importDefault(require("node-vk-bot-api"));
const commands_1 = __importDefault(require("./commands"));
const token = process.env.VK_ACCESS_TOKEN || '';
const bot = new node_vk_bot_api_1.default(token);
commands_1.default(bot);
exports.default = bot;
//# sourceMappingURL=index.js.map