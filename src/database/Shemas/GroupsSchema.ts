import {Schema} from "mongoose";
import {GroupSchema} from "../../utils/types";

const groupsSchema = new Schema<GroupSchema>({
  group_id: Number,
  users: [Number]
})

export default groupsSchema;