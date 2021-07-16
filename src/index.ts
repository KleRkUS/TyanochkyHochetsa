import express, { Express, Request, Response } from 'express';
import createBot from "./bot/index";
import initModel from "./database/Model";
import { Models } from "./utils/types";
import { VK } from "vk-io";

require("dotenv").config();
const bodyParser = require('body-parser');

const port: string | number = process.env.PORT || 3000;
const groupId: string = process.env.GROUP_ID;

const app: Express = express();
app.use(bodyParser.json());

const models: Models = initModel();
const vk: VK = createBot(models);
const { updates } = vk;
vk.updates.start().catch((err) => {
  console.log(err)
});

app.post("/", (req: Request, res: Response) => {
  if (req.body.type === "confirmation" && String(req.body.group_id) === groupId) {
    res.send(process.env.CONFIRMATION_STRING || "");
  } else {
    updates.getWebhookCallback('/')(req, res);
  }
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
})