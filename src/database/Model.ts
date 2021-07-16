import {
  connect as mongooseConnect,
  connection as mongooseConnection,
  model
} from "mongoose";
import groupsSchema from "./Shemas/GroupsSchema";
import usersSchema from "./Shemas/UsersSchema";
import { GroupSchema, UsersSchema} from "../utils/types";
import { Models } from "../utils/types";

const initModel = (): Models => {
  mongooseConnect(`mongodb://${process.env.SERVER_LOCATION}/application`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
      .then((res) => {
        console.log(`Mongoose connected: ${JSON.stringify(res)}`)
      })
      .catch((err) => {
        console.log(`Mongoose connection error: ${err}`);
      })
  const db = mongooseConnection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log("Connection opened!")
  });

  return{
    groups: model<GroupSchema>("Group", groupsSchema),
    users: model<UsersSchema>("Users", usersSchema)
  }
}

export default initModel;