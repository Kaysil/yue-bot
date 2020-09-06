const fs = require("fs");
const path = require("path");

module.exports = ((client) => {
    const logger = new client.utils.logger(`COMMANDER`);
    
    fs.readdir(path.join(__dirname, "..", "commands"), (err, files) => {
        if (err) return logger.error(err);

        for (let file of files) {
            if (!file.endsWith(".command.js")) return;
            let commandData = require(`../commands/${file}`);
            
            for (let command of commandData.commands) {
                client.commands.set(command, commandData);
            }

            logger.log(`Đã load file lệnh ${file}`);
        }
    })
});
