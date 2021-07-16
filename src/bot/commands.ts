import { VK } from "vk-io";
import { API } from 'vk-io';
import { Models, PeerType } from "../utils/types";
import MessageHandler from "./handler";

const initializeBot = (bot: VK, models: Models): VK => {

  const api: API = new API({
    token: process.env.VK_ACCESS_TOKEN,
    apiLimit: 20
  })

  const handler = new MessageHandler({models, api});

  bot.updates.on('message_new', async (context, next) => {
    if (context.isGroup) return;
    const { peerType } = context

    if (peerType === PeerType.User) {
      await context.send("Если остались вопросы - прочитай мануал в группе");
    } else if (peerType === PeerType.Group) {
      // await context.send("У Наоки нет тяночки")

      await handler.handleIncomingMessage(context, async (msg: string) => {
        await context.send(msg)
      })
    }
  })

  return bot;
}

//"Привет! Добавь меня в чат с тем неудачником без тяночки, чтобы я каждый день напоминал ему о бренности его жизни!"

export default initializeBot;