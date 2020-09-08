require("dotenv").config();
const { BOT_PREFIX, BOT_TOKEN, BOT_ADMINS, PORT, npm_package_version } = process.env;

const Discord = require("discord.js");
const DiscordPlayer = require("discord-player");
const DiscordTicTacToe = require("discord-tictactoe");

const client = new Discord.Client();
const player = new DiscordPlayer.Player(client, { leaveOnEmpty: true });
const tictactoe = new DiscordTicTacToe({ language: "vi", command: `${BOT_PREFIX}ccr` }, client);

const fs = require("fs");
const os = require("os");
const path = require("path");
const ffmpeg = path.dirname(require("ffmpeg-static"));

const app = require("./app");
const utils = require("./utils");
const handlers = require("./handlers");

const logger = new utils.logger();
const database = utils.database;

// Clients
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.lang = new Discord.Collection();
client.cooldowns = new Discord.Collection();
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
logger.log(`Đang khởi chạy Yue-Bot v${npm_package_version}`);
logger.log(`(C) 2020 - Made by Kaysil`);
console.log("\n")

client.on("warn", logger.warn);
client.on("error", logger.error);
client.on("ready", client.handlers.events.ready.bind(null, client));
client.on("message", client.handlers.events.message.bind(null, client));

client.login(BOT_TOKEN);

const server = app.listen((PORT || 1204), () => {
    (new utils.logger(`SERVER`)).log(`Server đã khởi động và chạy ở port ${server.address().port}`);
});