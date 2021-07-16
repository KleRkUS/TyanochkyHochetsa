"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./bot/index"));
const Model_1 = __importDefault(require("./database/Model"));
require("dotenv").config();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const groupId = process.env.GROUP_ID;
const app = express_1.default();
app.use(bodyParser.json());
const models = Model_1.default();
const vk = index_1.default(models);
const { updates } = vk;
vk.updates.start().catch((err) => {
    console.log(err);
});
app.post("/", (req, res) => {
    if (req.body.type === "confirmation" && String(req.body.group_id) === groupId) {
        res.send(process.env.CONFIRMATION_STRING || "");
    }
    else {
        updates.getWebhookCallback('/')(req, res);
    }
});
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
//# sourceMappingURL=index.js.map