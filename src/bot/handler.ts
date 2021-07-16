import { MongoError } from "mongodb";
import {API, MessageContext} from "vk-io";
import { regexIncoming } from "../utils/regex";
import {GroupSchema, Models} from "../utils/types";


type MessageHandlerParams = {
  models: Models,
  api: API
}

type UserInfo = {
  first_name: string,
  id: number,
  last_name: string,
  status?: boolean
}

class MessageHandler {
  models: Models;
  api: API;

  constructor({
    models,
    api
  }: MessageHandlerParams) {
    this.models = models;
    this.api = api;
  }

  async handleExistingUserMention(
      exactPart: string,
      user: UserInfo,
      chatId: number,
      isDeletion: boolean
  ): Promise<string> {

    const hasFound = new RegExp(regexIncoming.hasFound).test(exactPart);
    const hasLost = new RegExp(regexIncoming.hasLost).test(exactPart);

    if (isDeletion) return this.removeUser(user.id, chatId).then((res: any) => {
      if (!res.ok) throw new Error();
      return `Пользователь [id${user.id}|${user.first_name} ${user.last_name}] успешно удален`
    }).catch((err: MongoError) => {
      console.log(`Ошибка: ${JSON.stringify(err)}`);
      return this.throwLoggedError(err);
    });

    console.log(hasFound, hasLost, exactPart)

    return this.getObjectStatus(user.id, chatId)
      .then((status: { status: boolean, objectType: boolean }) => {
        if (hasLost) {
          if (!status.status) return `Спасибо, я уже в курсе, что у [id${user.id}|${user.first_name} ${user.last_name}] нет ${status.objectType ? "тяночки" : "кунчика"}`
          return this.updateUserStatus(user.id, chatId, false).then((res: any) => {
            if (!res.ok) return this.throwLoggedError(res);
            return `Собственно нахуй эти отношения и не нужны, да, [id${user.id}|${user.first_name} ${user.last_name}]?`;
          });
        }

        if (hasFound) {
          if (status.status) return `Спасибо, я уже в курсе, что у [id${user.id}|${user.first_name} ${user.last_name}] есть ${status.objectType ? "тяночка" : "кунчик"}`
          return this.updateUserStatus(user.id, chatId, true).then((res: any) => {
            if (!res.ok) return this.throwLoggedError(res);
            return `Поздравляем, [id${user.id}|${user.first_name} ${user.last_name}]! Счастья и здоровья деткам`;
          });
        }

        return `Пользователь [id${user.id}|${user.first_name} ${user.last_name}] ${status.status ? "уже нашёл" : "до сих пор не нашёл"} ${status.objectType ? "тяночку" : "кунчика"}`
      })
      .catch((err) => {
        console.log(`Ошибка: ${JSON.stringify(err)}`);
        return this.throwLoggedError(err);
      });

  }

  async handleNewUserMention(
    context: MessageContext,
    exactPart: string,
    user: UserInfo
  ): Promise<string> {
    const maleRegex = new RegExp(regexIncoming.male);
    return this.createUser(user.id, !maleRegex.test(exactPart), context.peerId)
      .then((res) => {
        return `Пользователь [id${user.id}|${user.first_name} ${user.last_name}] успешно зарегистрирован!`
      })
      .catch((err) => {
        console.log(`Ошибка: ${JSON.stringify(err)}`);
        return this.throwLoggedError(err);
      })
  }

  handleUserMentions(context: MessageContext ): Promise<string[]> {
    const ids: string[] = context.text.match(regexIncoming.userMention);
    ids.shift()
    
    return this.getUsersByIds(ids).then((res: any) => (

      Promise.all(res.map(async ({
        first_name,
        id,
        last_name,
        status
      }: UserInfo) => {
        const exactPartRegex: RegExp = new RegExp(`[^\\]]*\\[id${id}\\|[^\\]]*\\][^\\[]*`);
        const exactPart:string = context.text.match(exactPartRegex)[0];

        const creationRegex: RegExp = new RegExp(regexIncoming.register);

        const isDeletion: boolean = new RegExp(regexIncoming.remove).test(exactPart)
        const isCreation: boolean = creationRegex.test(exactPart);
  
        return await this.isExistsInChat(id, context.peerId).then( async (exist: boolean) => {
  
            if (exist) {

              if (isCreation) return `Пользователь [id${id}|${first_name} ${last_name}] уже зарегистрирован`
              return await this.handleExistingUserMention(
              exactPart,
              {
                first_name,
                id,
                last_name,
                status
              }, 
              context.peerId,
              isDeletion);

            } else {
              if (isCreation) return await this.handleNewUserMention(
                context,
                exactPart,
                {
                  first_name,
                  id,
                  last_name,
                }
              )
              
              return `Пользователь [id${id}|${first_name} ${last_name}] ещё не зарегистрирован!`
            }
    
        }).catch((err) => {
          console.log(`Ошибка: ${JSON.stringify(err)}`);
          return this.throwLoggedError(err);
        })

      }))

    ))
  }

  async handleIncomingMessage(context: MessageContext, next: (string) => Promise<void> ) {
    const groupMentionRegex = new RegExp(regexIncoming.groupMention)
    if (!groupMentionRegex.test(context.text)) return;

    if (context.text.match(regexIncoming.userMention)) {
      await this.handleUserMentions(context)
        .then((result: string[]) => {
          console.log(result);
          next(result.join('\n'));
      });

    }
  }

  async isExistsInChat(id: number, chatId: number): Promise<boolean> {
    return await this.models.users.exists({ 
      id: id,
      chat_id: chatId 
    })
  }

  async getObjectStatus(id: number, chatId: number): Promise<any> {
    return await this.models.users.findOne({ 
      id: id,
      chat_id: chatId
    }).then((res: any) => ({
        status: res.status,
        objectType: res.object
      }))
  }

  async getUserById(id) {
    return await this.api.users.get({
      user_ids: [id]
    });
  }

  async getUsersByIds(ids: string[]) {
    return await this.api.users.get({
      user_ids: ids
    });
  }

  async updateUserStatus(id: number, chatId: number, status: boolean): Promise<any> {
    return await this.models.users.updateOne({
      id, 
      chat_id: chatId,
    }, {status})
  }

  async createUser(id: number | string, gender: boolean, peerId: number): Promise<any> {
    return this.models.users.create({
      id: typeof id === "number" ? id : Number(id),
      object: gender,
      chat_id: peerId,
      status: false
    });
  }

  async removeUser(id: number, chatId: number): Promise<any> {
    return this.models.users.deleteOne({
      id: id,
      chat_id: chatId
    })
  }

  throwLoggedError(err: any) {
    console.log(err);
    return `Что-то пошло не так, но я уже сохранил информацию об ошибке для своего создателя, попробуй ещё раз`
  }
}

export default MessageHandler;