
const initializeBot = (bot: VkBot): VkBot => {

  bot.use(async (ctx: VkBotContext, next: () => any) => {
    try {
      await next();
    } catch (e: any) {
      console.log(`Error: ${e}`)
    }
  })

  bot.command('/start', async (ctx: VkBotContext) => {
    await ctx.reply('Привет! Добавь меня в чат с тем неудачником без тяночки, чтобы я каждый день напоминал ему о бренности его жизни!');
  });


  bot.startPolling((err: any) => {
    if (err) {
      console.log(err);
    }
    return {};
  });

  return bot;
}

export default initializeBot;