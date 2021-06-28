import express, { Express, Request, Response } from 'express';
import bot from "./bot/index";
// import api from 'node-vk-bot-api/lib/api';
require("dotenv").config();
import bodyParser from 'body-parser';

const port: string | number = process.env.PORT || 3000;

const app: Express = express();


app.post("/", (req: Request, res: Response) => {
  res.send(process.env.CONFIRMATION_STRING || "");
})

app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
})