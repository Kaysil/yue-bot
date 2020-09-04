const CanvaCord = require("canvacord");
const { rank } = require("canvacord");

module.exports = {
    name: "rank",
    description: "Xem rank cúa bạn hoặc ai đó",
    commands: ["rank"],
    usage: "[@mentions]",
    execute: (async (client, message, args) => {
        const db = client.db;
        const rankHandle = client.handles.rank;

        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        let guildId = message.guild.id;
        let userId = user.id;
        let guildData = db.get("guilds");
        var rankBuffer;

        if (guildData.value()[guildId].users[userId]) {
            let { score, level } = guildData.value()[guildId].users[userId];
            let neededScore = parseInt(level * 50 + level * 5).toFixed();

            rankBuffer = await CanvaCord.rank({
                username: user.username,
                discrim: user.discriminator,
                currentXP: score.toString() || "0",
                neededXP: neededScore.toString() || "45",
                rank: rankHandle(client, message, user.id),
                level: level.toString() || "1",
                status: user.presence.status,
                avatarURL: user.displayAvatarURL({ format: "png" }),
                background: await CanvaCord.color("#16213e")
            });
        } else {
            rankBuffer = await CanvaCord.rank({
                username: user.username,
                discrim: user.discriminator,
                currentXP: "0",
                neededXP: "45",
                rank: "null",
                level: "1",
                avatarURL: user.displayAvatarURL({ format: "png" }),
                status: user.presence.status,
                background: "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixlib=rb-1.2.1&w=1000&q=80"
            });
        }
            message.reply({
                files: [{
                    attachment: rankBuffer
                }]
            });
    })
};