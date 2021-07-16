import initializeBot from "./commands";
import { VK } from 'vk-io';
import {Model, Mongoose} from "mongoose";
import {GroupSchema, Models} from "../utils/types";

// const token: string = process.env.VK_ACCESS_TOKEN || '';
const token = 'f8d4dcee297ed9bd8a30a61d3c3f501fbcb2deeda2d7a036a15a8c9d0d5978064d660e4fac8612c9a3664';
// const groupId: string = process.env.GROUP_ID;



const createBot = (models: Models): VK =>  {
  const vk = new VK({
    token: token,
  })
  initializeBot(vk, models);
  return vk;
}


export default createBot;