const { MessageEmbed } = require("discord.js");
require("dotenv").config();

module.exports = {
    name: "help",
    description: "Lệnh dùng để nhận danh sách các lệnh có sẵn",
    commands: ["help", "commands"],
    usage: "[lệnh]",
    cooldown: 7000,
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
            if (!client.commands.has(args[0])) return message.reply(`Lệnh không tồn tại`);
            var commandInfo = client.commands.get(args[0]);

            var embedMessages = new MessageEmbed()
            .setTitle(`Thông tin về lệnh ${BOT_PREFIX}${args[0]}`)
            .setColor(`#21e721`)
            .addField(`Lệnh: `, `${commandInfo.commands[0]}`)
            .addField(`Alias: `, `${commandInfo.commands.slice(1).join(", ") ? commandInfo.commands.slice(1).join(", "): "không có"}`)
            .addField(`Cooldown: `, `${(Math.floor((commandInfo.cooldown) / 1000)) || 5}s`)
            .addField(`Mô tả: `, `${commandInfo.description}`)
            .addField(`Sử dụng:  `, `${commandInfo.usage}`);

            message.reply(embedMessages)
        }
    })
};