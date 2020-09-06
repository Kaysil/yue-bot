module.exports = ((client, message) => {
    const { BOT_PREFIX } = client.config;
    const logger = new client.utils.logger();

    if (!message.content.startsWith(BOT_PREFIX)) return;
	const args = message.content.slice(BOT_PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const userId = message.author.id;
    
    if (!client.commands.has(command)) return;
    if (client.cooldowns.get(`${command}_${userId}`) > Date.now()) return message.reply(`:x: Thao tác quá nhanh, Hãy đợi ${Math.floor((client.cooldowns.get(`${command}_${userId}`) - Date.now()) / 1000)} giây nữa rồi thực hiện lại lệnh`);
    
    let commandData = client.commands.get(command);

    client.cooldowns.set(`${command}_${userId}`, Date.now() + (commandData.cooldown || 5000));
    commandData.execute(client, message, args);

    logger.log(`${message.author.tag} đã sử dụng lệnh ${BOT_PREFIX}${command} ${args.join(" ")}`);
});