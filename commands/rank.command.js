const CanvaCord = require("canvacord");
const { rank } = require("canvacord");

module.exports = {
    name: "rank",
    description: "Xem rank cúa bạn hoặc ai đó",
    commands: ["rank"],
    usage: "[@mentions]",
    execute: (async (client, message, args) => {
        const db = client.db;
        const rankHandler = client.handlers.commands.rankHandler;

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
                rank: rankHandler(client, message, user.id),
                level: level.toString() || "1",
                status: user.presence.status,
                avatarURL: user.displayAvatarURL({ format: "png" })
            });
        } else {
            rankBuffer = await CanvaCord.rank({
                username: user.username,
                discrim: user.discriminator,
                currentXP: "0",
                neededXP: "45",
                rank: "null",
                level: "1",
                status: user.presence.status,
                avatarURL: user.displayAvatarURL({ format: "png" })
            });
        }
            message.reply({
                files: [{
                    attachment: rankBuffer
                }]
            });
    })
};