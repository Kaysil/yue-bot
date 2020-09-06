const fs = require("fs");
const path = require("path");

module.exports = ((client) => {
    const logger = new client.utils.logger(`LANG`);

    fs.readdir(path.join(__dirname, "..", "lang"), (err, files) => {
        if (err) return logger.error(err);

        for (let file of files) {
            if (!file.endsWith(".lang.json")) return;
            let langData = require(`../lang/${file}`);

            client.lang.set(file.split(".")[0], langData);

            logger.log(`Đã load file ngôn ngữ ${file}`);
        }
    })
});
