import {Schema} from "mongoose";
import {UsersSchema} from "../../utils/types";

const usersSchema = new Schema<UsersSchema>({
  id: Number,
  chat_id: Number,
  object: Boolean,
  status: Boolean
})

export default usersSchema;