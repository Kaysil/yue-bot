require("dotenv").config();
const { BOT_PREFIX } = process.env;

const CanvaCord = require("canvacord");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "trigger",
    description: "TRIGGER",
    commands: ["trigger"],
    usage: "[@tag]",
    execute: (async (client, message, args) => {
        var user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        var triggerBuffer = await CanvaCord.trigger(user.displayAvatarURL({ format: "png", dymanic: false }));
        message.reply({ 
            files: [{
                attachment: triggerBuffer,
                name: "triggered.gif"
            }]
        });
    })
};