const { MessageEmbed } = require("discord.js");
require("dotenv").config();

module.exports = {
    name: "queue",
    description: "Lấy danh sách những bải hát trong hàng chờ",
    commands: ["queue", "list"],
    usage: "none",
    execute: (async (client, message, args) => {
        let guildId = message.guild.id;
        if (!client.player.isPlaying(guildId)) return message.reply(`Bot đang không phát bản nhạc nào tại server này`);

        let queueData = await client.player.getQueue(guildId);
        let queueList = queueData.tracks.map((track, i) => {
            return `#${i + 1} - "${track.name}" | "${track.author}" yêu cầu bởi <@${track.requestedBy.id}>`
        });
        let nowPlaying = `Hiện đang phát - "${queueData.playing.name}" | "${queueData.playing.author}" yêu cầu bởi <@${queueData.playing.requestedBy.id}>`;

        message.reply(nowPlaying);
        message.reply(
            `Danh sách hàng chờ:\r\n` +
            `${queueList.length > 0 ? queueList.join("\n"): "none"}`
        );
    })
};