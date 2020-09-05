module.exports = ((client) => {
    client.handlers.commands.loadCommands(client);

    const logging = new client.utils.logger();

    logging.log(`Đã dăng nhập với username là ${client.user.tag}`)

    client.user.setActivity(`yue-bot.org | ${client.config.BOT_PREFIX}help`, {
        type: "PLAYING"
    });
});