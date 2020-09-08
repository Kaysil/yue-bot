const { MessageEmbed } = require("discord.js");
require("dotenv").config();

module.exports = {
    name: "help",
    description: "Lệnh dùng để nhận danh sách các lệnh có sẵn",
    command: "help",
    aliases: ["commands"],
    usage: "[lệnh]",
    cooldown: 3000,
    execute: ((client, message, args) => {
        const { BOT_PREFIX } = client.config;
        
        if (!args[0]) {
            var commands = Array.from(client.commands.keys()).map(el => BOT_PREFIX + el);
            var messages = ``;
            messages += "Danh sách các lệnh:\r\n";
            messages += "``` " + commands.join(", ") + " ```\r\n";
            messages += `Sử dụng: ${BOT_PREFIX}help [lệnh] - để biết chi tiết và cách sử dụng các lệnh`;

            message.reply(messages);
        } else {
            if (client.aliases.has(args[0])) {
                var commandInfo = client.aliases.get(args[0]);

                var embedMessages = new MessageEmbed()
                .setTitle(`Thông tin về lệnh ${BOT_PREFIX}${args[0]}`)
                .setColor(`#21e721`)
                .addField(`Lệnh: `, `${commandInfo.command}`)
                .addField(`Alias: `, `${commandInfo.aliases ? commandInfo.aliases.join(", "): "không có"}`)
                .addField(`Cooldown: `, `${(Math.floor((commandInfo.cooldown) / 1000)) || 5}s`)
                .addField(`Mô tả: `, `${commandInfo.description}`)
                .addField(`Sử dụng:  `, `${commandInfo.usage}`);

                message.reply(embedMessages)
            } else if (client.commands.has(args[0])) {
                var commandInfo = client.commands.get(args[0]);

                var embedMessages = new MessageEmbed()
                .setTitle(`Thông tin về lệnh ${BOT_PREFIX}${args[0]}`)
                .setColor(`#21e721`)
                .addField(`Lệnh: `, `${commandInfo.command}`)
                .addField(`Alias: `, `${commandInfo.aliases ? commandInfo.aliases.join(", "): "không có"}`)
                .addField(`Cooldown: `, `${(Math.floor((commandInfo.cooldown) / 1000)) || 5}s`)
                .addField(`Mô tả: `, `${commandInfo.description}`)
                .addField(`Sử dụng:  `, `${commandInfo.usage}`);

                message.reply(embedMessages)
            } else {
                message.reply(`Lệnh không tồn tại`)
            }
        }
    })
};