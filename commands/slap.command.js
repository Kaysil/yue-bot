const CanvaCord = require("canvacord");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "slap",
    description: "Tát một ai đó mà bạn thích, hoặc tự tát chính bạn",
    command: "slap",
    usage: "[@mentions]",
    cooldown: 3000,
    execute: (async (client, message, args) => {
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        let slapBuffer = await CanvaCord.batslap(message.author.displayAvatarURL({ format: "png", dymanic: false }), user.displayAvatarURL({ format: "png", dymanic: false }));
        message.reply({ 
            files: [{
                attachment: slapBuffer,
                name: "slap.png"
            }]
        });
    })
};