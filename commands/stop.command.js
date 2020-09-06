module.exports = {
    name: "stop",
    description: "Dừng nhạc",
    commands: ["s", "stop"],
    usage: "none",
    cooldown: 3000,
    execute: (async (client, message, args) => {
        let guildId = message.guild.id;
        if (!message.member.voice.channel) return message.reply(client.lang.get("vi")["MustBeInChannel"]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(client.lang.get("vi")["InvalidChannel"]);

        client.player.stop(message.guild.id);
    })
};