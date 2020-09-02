
require("dotenv").config();

const { Client, Collection }= require("discord.js");
const fs = require("fs");
const path = require("path");

const { BOT_PREFIX, BOT_TOKEN } = process.env;
const { version } = require("./package.json");

const Server = require("./server")();
const logging = new (require("./utils/log"))();

const client = new Client();
client.commands = new Collection();

console.log(`\n`);
logging.log(`Đang khởi chạy Yue-Bot v${version}`);
logging.log(`Đây là một dự án mã nguồn mở, bạn có thể xem mã nguồn tại GitHub: https://github.com/Kaysil/yue-bot`);
logging.log(`(C) 2020 - Made by Kaysil`);
console.log(`\n`);

// Load tất cả những lệnh trong thư mục commands
fs.readdirSync(path.join(__dirname, "commands"))
.filter(command => command.endsWith(".js"))
.forEach(command => {
    var commandData = require(`./commands/${command}`);
    client.command.set(commandData.command, commandData.execute);

    if (commandData.aliases) {
        commandData.aliases.forEach(alias => {
            client.command.set(alias, commandData.execute);
        });
    }
});

client.on("ready", () => {
    logging.log(`Đã dăng nhập với tên người dùng là ${client.user.tag}`);
});
 
client.on("message", (message) => {
    logging.log(`Đã nhận được một tin nhắn`);
});

client.login(BOT_TOKEN);