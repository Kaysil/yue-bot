const { MessageEmbed } = require("discord.js");
require("dotenv").config();

module.exports = {
    name: "play",
    description: "Chơi nhạc",
    commands: ["play"],
    usage: "[url]",
    execute: (async (client, message, args) => {
        if (!args[0]) return message.reply(`Nhập từ khóa để chọn bài hát`);
        if (!message.member.voice.channel) return message.reply(`Bạn không ở trong kênh thoại nào`);
        
        let guildId = message.guild.id;
        let track;

        if (client.player.isPlaying(guildId)) {
            track = await client.player.addToQueue(message.guild.id, args.join(" "), message.author);

            if (track.type === "playlist") {
                 message.reply(`${track.tracks.length} bài đã được thêm vào hàng chờ`);
            } else {
                 message.reply(`${track.name} đã được thêm vào hàng chờ`);
            }
        } else {
            track = await client.player.play(message.member.voice.channel, args.join(" "), message.author);

            if (track.type === "playlist") {
                message.reply(`${track.tracks.length} bài hát vừa được thêm vào\nHiện đang phát **${track.tracks[0].name}**...`);
            } else {
                message.reply(`Hiện đang phát ${track.name}...`);
            }
        }
    })
};