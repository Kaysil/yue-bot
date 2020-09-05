require("dotenv").config();
const { BOT_PREFIX, BOT_TOKEN, BOT_ADMINS, PORT } = process.env;

const { Client, Collection }= require("discord.js");
const { Player } = require("discord-player");
const TicTacToe = require("discord-tictactoe");
const client = new Client();
const player = new Player(client, { leaveOnEmpty: true });
const app = require("express")();
const fs = require("fs");
const os = require("os");
const path = require("path");
const ffmpeg = path.dirname(require("ffmpeg-static"));

const { version } = require("./package.json");
const utils = require("./utils");
const handlers = require("./handlers");

const logger = new utils.logger();
const database = utils.database;

// Clients
client.commands = new Collection();
client.player = player;
client.db = database;
client.utils = utils;
client.handlers = handlers;
client.config = {
    BOT_PREFIX,
    BOT_TOKEN,
    BOT_ADMINS: BOT_ADMINS.split(",")
}

// Adding FFMPEG to path
if (os.platform() == "win32") {
    process.env.PATH += ";" + ffmpeg;
} else {
    process.env.PATH += ":" + ffmpeg;
}

console.log("\n")
logger.log(`Đang khởi chạy Yue-Bot v${version}`);
logger.log(`(C) 2020 - Made by Kaysil`);
console.log("\n")

client.on("warn", logger.warn);
client.on("error", logger.error);
client.on("ready", client.handlers.events.ready.bind(null, client));
client.on("message", client.handlers.events.message.bind(null, client));

new TicTacToe({
    language: "vi",
    command: `${BOT_PREFIX}ccr`
}, client);

client.login(BOT_TOKEN);

app.get("/", (req, res) => res.status(200).send("Bot đang chạy"));
app.listen(process.env.PORT || 1204, () => logger.log(`Server đang chạy ở cổng ${PORT || 1204}`));