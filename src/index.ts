import express, { Express, Request, Response } from 'express';
import VkBot from 'node-vk-bot-api';
require("dotenv").config();
import bodyParser from 'body-parser';

const port: string | number = process.env.PORT || 3000;
const token: string = process.env.VK_ACCESS_TOKEN || '';

const app: Express = express();
const bot: VkBot = new VkBot(token);

bot.command('/start', (ctx: VkBotContext) => {
  console.log(`Event triggered: ${JSON.stringify(ctx)}`);
  ctx.reply('Hello!');
});

app.post("/", (req: Request, res: Response) => {
  res.send(process.env.CONFIRMATION_STRING || "");
})

app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
})
bot.startPolling((err: any) => {
  if (err) {
    console.log(err);
  }
  return {};
});