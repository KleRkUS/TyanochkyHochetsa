import {Model, Schema} from "mongoose";

export enum PeerType {
  User = "user",
  Group = "chat"
}

export enum ObjectToFind {
  Boy = "b",
  Girl = "g"
}

export interface GroupSchema {
  group_id: number,
  users: number[]
}

export interface UsersSchema {
  id: number,
  group_id: number,
  object: boolean,
  status: boolean
}

export type Models = {
  groups: Model<GroupSchema>,
  users: Model<UsersSchema>
}