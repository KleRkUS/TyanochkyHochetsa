const express = require('express');
const VkBot = require('node-vk-bot-api');
require("dotenv").config();
const bodyParser = require('body-parser');

const port: string | number = process.env.PORT || 3000;
const token: string = process.env.VK_ACCESS_TOKEN || '';

const app = express();
const bot = new VkBot(token);

bot.command('/start', (ctx: { reply: (arg0: string) => void; }) => {
  ctx.reply('Hello!');
});


app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
})
bot.startPolling();