"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import api from 'node-vk-bot-api/lib/api';
require("dotenv").config();
const body_parser_1 = __importDefault(require("body-parser"));
const port = process.env.PORT || 3000;
const app = express_1.default();
app.post("/", (req, res) => {
    res.send(process.env.CONFIRMATION_STRING || "");
});
app.use(body_parser_1.default.json());
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
//# sourceMappingURL=index.js.map