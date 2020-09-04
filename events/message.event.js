module.exports = ((client, message) => {
    const logging = new client.utils.logger();
    const { BOT_PREFIX } = client.config;

    client.handles.xp(client, message);

    if (!message.content.startsWith(BOT_PREFIX)) return;

	const args = message.content.slice(BOT_PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (!client.commands.has(command)) return;
    client.commands.get(command).execute(client, message, args);
});