"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vk_io_1 = require("vk-io");
const types_1 = require("../utils/types");
const handler_1 = __importDefault(require("./handler"));
const initializeBot = (bot, models) => {
    const api = new vk_io_1.API({
        token: process.env.VK_ACCESS_TOKEN,
        apiLimit: 20
    });
    const handler = new handler_1.default({ models, api });
    bot.updates.on('message_new', (context, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (context.isGroup)
            return;
        const { peerType } = context;
        if (peerType === types_1.PeerType.User) {
            yield context.send("Если остались вопросы - прочитай мануал в группе");
        }
        else if (peerType === types_1.PeerType.Group) {
            // await context.send("У Наоки нет тяночки")
            yield handler.handleIncomingMessage(context, (msg) => __awaiter(void 0, void 0, void 0, function* () {
                yield context.send(msg);
            }));
        }
    }));
    return bot;
};
//"Привет! Добавь меня в чат с тем неудачником без тяночки, чтобы я каждый день напоминал ему о бренности его жизни!"
exports.default = initializeBot;
//# sourceMappingURL=commands.js.map