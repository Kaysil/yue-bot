var xpHandle = ((client, message) => {
    if (message.author.bot) return;

    let guildId = message.guild.id;
    let userId = message.author.id;

    let guildData = client.db.get("guilds");

    if (!guildData.value()[guildId]) {
        guildData.set(`${guildId}.users.${userId}`, { score: 1, level: 1 }).write();
    } else {
        guildData.update(`${guildId}.users.${userId}.score`, (n) => n + 1).write();
        let score = guildData.value()[guildId].users[userId].score;
        let currLevel = guildData.value()[guildId].users[userId].level;
        let calcLevel = Math.floor(0.3 * Math.sqrt(score));

        if (calcLevel > currLevel) {
            message.reply(`:tada: Bạn vừa lên level ${calcLevel}`);
            guildData.update(`${guildId}.users.${userId}.level`, (n) => n + 1).write();
        }
    }
});

module.exports = xpHandle;