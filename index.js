
require("dotenv").config();
const { BOT_PREFIX, BOT_TOKEN } = process.env;

const { Client, Collection }= require("discord.js");
const client = new Client();
const TicTacToe = require("discord-tictactoe");
const fs = require("fs");
const path = require("path");

const server = require("./server.js");
const { version } = require("./package.json");

// Utils
const utils = require("./utils");
const logging = new utils.logger();
const db = utils.database;

// Handles
const handles = require("./handles");

// Clients
client.commands = new Collection();
client.db = db;
client.utils = utils;
client.handles = handles;
client.config = {
    BOT_PREFIX,
    BOT_TOKEN
}

console.log(`\n`);
logging.log(`Đang khởi chạy Yue-Bot v${version}`);
logging.log(`Đây là một dự án mã nguồn mở, bạn có thể xem mã nguồn tại GitHub: https://github.com/Kaysil/yue-bot`);
logging.log(`(C) 2020 - Made by Kaysil`);
console.log(`\n`);

// Load tất cả command có trong thư mục commands
fs.readdirSync(path.join(__dirname, "commands")).filter(files => files.endsWith(".command.js")).forEach(commandFile => {
    var commandData = require(path.join(__dirname, "commands", commandFile));

    commandData.commands.forEach(command => {
        client.commands.set(command, commandData);
    });
});

// Load event
fs.readdirSync(path.join(__dirname, "events")).filter(files => files.endsWith(".event.js")).forEach(eventFile => {
    var eventExec = require(path.join(__dirname, "events", eventFile));

    client.on(eventFile.split(".")[0], eventExec.bind(null, client));
});

new TicTacToe({
    language: "vi",
    command: `${BOT_PREFIX}co_caro`
}, client);

client.login(BOT_TOKEN);