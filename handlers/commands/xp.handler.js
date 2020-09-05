module.exports = ((client, message) => {
    const logging = new client.utils.logger();
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
        let neededXp = parseInt(currLevel * 50 + currLevel * 5).toFixed();
        let nextLevel = 1
        
		while (score >= parseInt(nextLevel * 50 + nextLevel * 5)) {
			nextLevel++;
        }
        
        if (isNaN(score)) guildData.set(`${guildId}.users.${userId}.score`, 1).write();
        if (isNaN(currLevel)) guildData.set(`${guildId}.users.${userId}.level`, 1).write();

        if (nextLevel > currLevel) {
            neededXp = parseInt(nextLevel * 50 + nextLevel * 5).toFixed();
            message.reply(`:tada: Bạn vừa lên level ${nextLevel}, bạn cần "${neededXp} XP" nữa để lên level ${nextLevel + 1}`);
            guildData.update(`${guildId}.users.${userId}.level`, (n) => n = nextLevel).write();
        }
    }
});