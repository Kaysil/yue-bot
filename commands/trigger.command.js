const CanvaCord = require("canvacord");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "trigger",
    description: "TRIGGER",
    commands: ["trigger"],
    usage: "[@mentions]",
    cooldown: 3000,
    execute: (async (client, message, args) => {
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        let triggerBuffer = await CanvaCord.trigger(user.displayAvatarURL({ format: "png", dymanic: false }));
        message.reply({ 
            files: [{
                attachment: triggerBuffer,
                name: "triggered.gif"
            }]
        });
    })
};