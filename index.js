
require("dotenv").config();

const { BOT_PREFIX, BOT_TOKEN } = process.env;
const { version } = require("./package.json");

const Server = require("./server")();
const logging = new (require("./utils/log"))();

const { Client, Collection }= require("discord.js");

const client = new Client();
client.commands = new Collection();

logging.log(`Starting Yue-Bot v${version}`);

client.on("ready", () => {
    logging.log(`Logged in as ${client.user.tag}`);
});

client.login(BOT_TOKEN);