module.exports = ((client) => {
    const logging = new client.utils.logger();

    logging.log(`Đã dăng nhập với username là ${client.user.tag}`)

    client.user.setActivity("yue-bot.org | /help", {
        type: "PLAYING"
    });
});