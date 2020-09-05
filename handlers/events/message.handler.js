module.exports = ((client, message) => {
    const { BOT_PREFIX } = client.config;
    const logger = new client.utils.logger();

    client.handlers.commands.xpHandler(client, message);

    if (!message.content.startsWith(BOT_PREFIX)) return;
	const args = message.content.slice(BOT_PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (!client.commands.has(command)) return;
    logger.log(`${message.author.tag} issue on command ${BOT_PREFIX}${command} ${args.join(" ")}`)
    client.commands.get(command).execute(client, message, args);
});