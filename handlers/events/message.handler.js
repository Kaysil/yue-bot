module.exports = ((client, message) => {
    const { BOT_PREFIX } = client.config;
    const logger = new client.utils.logger();

    client.handlers.commands.xpHandler(client, message);
    client.handlers.commands.commandHandler(client, message);
});