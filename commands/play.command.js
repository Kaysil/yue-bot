const { MessageEmbed } = require("discord.js");
require("dotenv").config();

module.exports = {
    name: "play",
    description: "Chơi nhạc",
    commands: ["play"],
    usage: "[url]",
    execute: (async (client, message, args) => {
        if (!args[0]) return message.reply(`Nhập từ khóa để chọn bài hát`);

        let result;

        try {
            result = await client.player.play(message.member.voice.channel, args.join(" "), message.author);
        } catch (err) {
            message.reply(`Bạn chưa vào kênh voice`);
        }

        if (result.type === 'playlist') {
            message.channel.send(`${result.tracks.length} songs added to the queue!\nCurrently playing **${result.tracks[0].name}**...`);
        } else {
            message.channel.send(`Currently playing ${result.name}...`);
        }
    })
};