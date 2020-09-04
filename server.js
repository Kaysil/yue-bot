require("dotenv").config();
const { PORT } = process.env;

const utils = require("./utils");
const logging = new utils.logger("SERVER");

const app = require("express")();

app.get("/", (req, res) => {
    res.send("<h1>Yue-Bot</h1> (C) 2020 - Made by Kaysil");
});

const server = app.listen(PORT || 1204, () => {
    logging.log(`Server đã được khởi động và chạy ở cổng ${server.address().port}`);
});

module.exports = server;