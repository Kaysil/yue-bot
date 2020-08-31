
require("dotenv").config();

const { BOT_PREFIX, BOT_TOKEN } = process.env;
const { version } = require("./package.json");

const Server = require("./server")();
const logging = new (require("./utils/log"))();

const { Client, Collection }= require("discord.js");

const client = new Client();
client.commands = new Collection();

console.log(`\n`);
logging.log(`Đang khởi chạy Yue-Bot v${version}`);
logging.log(`Đây là một dự án mã nguồn mở, bạn có thể xem mã nguồn tại GitHub: https://github.com/Kaysil/yue-bot`);
logging.log(`Bản quyền thuộc về Kaysil`);
logging.log(`(C) 2020 - Kaysil`);
console.log(`\n`);

client.on("ready", () => {
    logging.log(`Đã dăng nhập với tên người dùng là ${client.user.tag}`);
});
 
client.on("message", (message) => {
    logging.log(``)
});

client.login(BOT_TOKEN);