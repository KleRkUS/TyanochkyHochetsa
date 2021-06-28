import VkBot from "node-vk-bot-api";
import initializeBot from "./commands";

const token: string = process.env.VK_ACCESS_TOKEN || '';
const bot: VkBot = new VkBot(token);
initializeBot(bot);

export default bot;