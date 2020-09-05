const fs = require("fs");
const path = require("path");

module.exports = ((client) => {
    const logger = new client.utils.logger();
    fs.readdir(path.join(__dirname, "..", "..", "commands"), (err, files) => {
        for (let file of files) {
            if (!file.endsWith(".command.js")) return;
            let commandData = require(`../../commands/${file}`);
            
            for (let command of commandData.commands) {
                client.commands.set(command, commandData);
            }

            logger.log(`[COMMAND] Đã load file ${file}`)
        }
    })
});
