module.exports = {
    commands: {
        rankHandler: require("./commands/rank.handler"),
        xpHandler: require("./commands/xp.handler"),
        loadCommands: require("./commands/loadcommand.handler")
    },
    events: {
        ready: require("./events/ready.handler"),
        message: require("./events/message.handler")
    }
}