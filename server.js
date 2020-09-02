const { PORT } = process.env;

const logging = new (require("./utils/log"))(`SERVER`);

const app = require("express")();

app.get("/", (req, res) => {
    res.send("<h1>Yue-Bot</h1> (C) 2020 - Made by Kaysil");
});

module.exports = createHttpServer = (() => {
    const server = app.listen(PORT || 1204, () => {
        logging.log(`Server đã được khởi động và chạy ở cổng ${server.address().port}`);
    });
});