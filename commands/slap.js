require("dotenv").config();
const { BOT_PREFIX } = process.env;

const CanvaCord = require("canvacord");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "slap",
    description: "Tát một ai đó mà bạn thích, hoặc tự tát chính bạn",
    commands: ["slap"],
    usage: "[@tag]",
    execute: (async (client, message, args) => {
        var user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        var slapBuffer = await CanvaCord.batslap(message.author.displayAvatarURL({ format: "png", dymanic: false }), user.displayAvatarURL({ format: "png", dymanic: false }));
        message.reply({ 
            files: [{
                attachment: slapBuffer,
                name: "slap.png"
            }]
        });
    })
};