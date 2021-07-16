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
const regex_1 = require("../utils/regex");
class MessageHandler {
    constructor({ models, api }) {
        this.models = models;
        this.api = api;
    }
    handleExistingUserMention(exactPart, user, chatId, isDeletion) {
        return __awaiter(this, void 0, void 0, function* () {
            const hasFound = new RegExp(regex_1.regexIncoming.hasFound).test(exactPart);
            const hasLost = new RegExp(regex_1.regexIncoming.hasLost).test(exactPart);
            if (isDeletion)
                return this.removeUser(user.id, chatId).then((res) => {
                    if (!res.ok)
                        throw new Error();
                    return `Пользователь [id${user.id}|${user.first_name} ${user.last_name}] успешно удален`;
                }).catch((err) => {
                    console.log(`Ошибка: ${JSON.stringify(err)}`);
                    return this.throwLoggedError(err);
                });
            console.log(hasFound, hasLost, exactPart);
            return this.getObjectStatus(user.id, chatId)
                .then((status) => {
                if (hasLost) {
                    if (!status.status)
                        return `Спасибо, я уже в курсе, что у [id${user.id}|${user.first_name} ${user.last_name}] нет ${status.objectType ? "тяночки" : "кунчика"}`;
                    return this.updateUserStatus(user.id, chatId, false).then((res) => {
                        if (!res.ok)
                            return this.throwLoggedError(res);
                        return `Собственно нахуй эти отношения и не нужны, да, [id${user.id}|${user.first_name} ${user.last_name}]?`;
                    });
                }
                if (hasFound) {
                    if (status.status)
                        return `Спасибо, я уже в курсе, что у [id${user.id}|${user.first_name} ${user.last_name}] есть ${status.objectType ? "тяночка" : "кунчик"}`;
                    return this.updateUserStatus(user.id, chatId, true).then((res) => {
                        if (!res.ok)
                            return this.throwLoggedError(res);
                        return `Поздравляем, [id${user.id}|${user.first_name} ${user.last_name}]! Счастья и здоровья деткам`;
                    });
                }
                return `Пользователь [id${user.id}|${user.first_name} ${user.last_name}] ${status.status ? "уже нашёл" : "до сих пор не нашёл"} ${status.objectType ? "тяночку" : "кунчика"}`;
            })
                .catch((err) => {
                console.log(`Ошибка: ${JSON.stringify(err)}`);
                return this.throwLoggedError(err);
            });
        });
    }
    handleNewUserMention(context, exactPart, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const maleRegex = new RegExp(regex_1.regexIncoming.male);
            return this.createUser(user.id, !maleRegex.test(exactPart), context.peerId)
                .then((res) => {
                return `Пользователь [id${user.id}|${user.first_name} ${user.last_name}] успешно зарегистрирован!`;
            })
                .catch((err) => {
                console.log(`Ошибка: ${JSON.stringify(err)}`);
                return this.throwLoggedError(err);
            });
        });
    }
    handleUserMentions(context) {
        const ids = context.text.match(regex_1.regexIncoming.userMention);
        ids.shift();
        return this.getUsersByIds(ids).then((res) => (Promise.all(res.map(({ first_name, id, last_name, status }) => __awaiter(this, void 0, void 0, function* () {
            const exactPartRegex = new RegExp(`[^\\]]*\\[id${id}\\|[^\\]]*\\][^\\[]*`);
            const exactPart = context.text.match(exactPartRegex)[0];
            const creationRegex = new RegExp(regex_1.regexIncoming.register);
            const isDeletion = new RegExp(regex_1.regexIncoming.remove).test(exactPart);
            const isCreation = creationRegex.test(exactPart);
            return yield this.isExistsInChat(id, context.peerId).then((exist) => __awaiter(this, void 0, void 0, function* () {
                if (exist) {
                    if (isCreation)
                        return `Пользователь [id${id}|${first_name} ${last_name}] уже зарегистрирован`;
                    return yield this.handleExistingUserMention(exactPart, {
                        first_name,
                        id,
                        last_name,
                        status
                    }, context.peerId, isDeletion);
                }
                else {
                    if (isCreation)
                        return yield this.handleNewUserMention(context, exactPart, {
                            first_name,
                            id,
                            last_name,
                        });
                    return `Пользователь [id${id}|${first_name} ${last_name}] ещё не зарегистрирован!`;
                }
            })).catch((err) => {
                console.log(`Ошибка: ${JSON.stringify(err)}`);
                return this.throwLoggedError(err);
            });
        })))));
    }
    handleIncomingMessage(context, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupMentionRegex = new RegExp(regex_1.regexIncoming.groupMention);
            if (!groupMentionRegex.test(context.text))
                return;
            if (context.text.match(regex_1.regexIncoming.userMention)) {
                yield this.handleUserMentions(context)
                    .then((result) => {
                    console.log(result);
                    next(result.join('\n'));
                });
            }
        });
    }
    isExistsInChat(id, chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.models.users.exists({
                id: id,
                chat_id: chatId
            });
        });
    }
    getObjectStatus(id, chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.models.users.findOne({
                id: id,
                chat_id: chatId
            }).then((res) => ({
                status: res.status,
                objectType: res.object
            }));
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.api.users.get({
                user_ids: [id]
            });
        });
    }
    getUsersByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.api.users.get({
                user_ids: ids
            });
        });
    }
    updateUserStatus(id, chatId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.models.users.updateOne({
                id,
                chat_id: chatId,
            }, { status });
        });
    }
    createUser(id, gender, peerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.models.users.create({
                id: typeof id === "number" ? id : Number(id),
                object: gender,
                chat_id: peerId,
                status: false
            });
        });
    }
    removeUser(id, chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.models.users.deleteOne({
                id: id,
                chat_id: chatId
            });
        });
    }
    throwLoggedError(err) {
        console.log(err);
        return `Что-то пошло не так, но я уже сохранил информацию об ошибке для своего создателя, попробуй ещё раз`;
    }
}
exports.default = MessageHandler;
//# sourceMappingURL=handler.js.map