"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GroupsSchema_1 = __importDefault(require("./Shemas/GroupsSchema"));
const UsersSchema_1 = __importDefault(require("./Shemas/UsersSchema"));
const initModel = () => {
    mongoose_1.connect(`mongodb://${process.env.SERVER_LOCATION}/application`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
        .then((res) => {
        console.log(`Mongoose connected: ${JSON.stringify(res)}`);
    })
        .catch((err) => {
        console.log(`Mongoose connection error: ${err}`);
    });
    const db = mongoose_1.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("Connection opened!");
    });
    return {
        groups: mongoose_1.model("Group", GroupsSchema_1.default),
        users: mongoose_1.model("Users", UsersSchema_1.default)
    };
};
exports.default = initModel;
//# sourceMappingURL=Model.js.map