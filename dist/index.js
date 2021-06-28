"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_vk_bot_api_1 = __importDefault(require("node-vk-bot-api"));
require("dotenv").config();
const body_parser_1 = __importDefault(require("body-parser"));
const port = process.env.PORT || 3000;
const token = process.env.VK_ACCESS_TOKEN || '';
const app = express_1.default();
const bot = new node_vk_bot_api_1.default(token);
bot.command('/start', (ctx) => {
    ctx.reply('Hello!');
});
app.use(body_parser_1.default.json());
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
bot.startPolling();
//# sourceMappingURL=index.js.map