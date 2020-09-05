module.exports = {
    name: "stop",
    description: "Dừng nhạc",
    commands: ["s", "stop"],
    usage: "none",
    execute: (async (client, message, args) => {
        let guildId = message.guild.id;
        if (!client.player.isPlaying(guildId)) return;

        client.player.stop(message.guild.id);
    })
};