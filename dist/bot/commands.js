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
Object.defineProperty(exports, "__esModule", { value: true });
const initializeBot = (bot) => {
    bot.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield next();
        }
        catch (e) {
            console.log(`Error: ${e}`);
        }
    }));
    bot.command('/start', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.reply('Привет! Добавь меня в чат с тем неудачником без тяночки, чтобы я каждый день напоминал ему о бренности его жизни!');
    }));
    bot.startPolling((err) => {
        if (err) {
            console.log(err);
        }
        return {};
    });
    return bot;
};
exports.default = initializeBot;
//# sourceMappingURL=commands.js.map