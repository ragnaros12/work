import express from 'express';
import schedule from 'node-schedule';
import {TelegramApi} from "./TelegramApi.js";

const app = express();
app.use(express.json());

let morning = schedule.scheduleJob({hour: 7, minute: 30}, async function () {
    TelegramApi.sendAllMessages("С добрым утром!");
});
let night = schedule.scheduleJob({hour: 21, minute: 30}, async function () {
    TelegramApi.sendAllMessages("Спокойной ночи!");
});

app.post('/updates', (req, res) => {
    TelegramApi.workUser(req.body.message.from.id);
});
app.get('/all', (req, res) => {
    res.send({users: TelegramApi.users, count : TelegramApi.index});
});

app.listen(443);
