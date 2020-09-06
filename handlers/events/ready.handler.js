module.exports = ((client) => {
    client.utils.loadCommands(client);
    client.utils.loadLangs(client);

    const logging = new client.utils.logger();

    logging.log(`Đã dăng nhập với username là ${client.user.tag}`)

    client.user.setActivity(`yue-bot.org | ${client.config.BOT_PREFIX}help`, {
        type: "PLAYING"
    });
});