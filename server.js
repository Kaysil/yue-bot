const { PORT } = process.env;

const logging = new (require("./utils/log"))(`SERVER`);

const app = require("express")();

module.exports = createHttpServer = (() => {
    const server = app.listen(PORT || 1204, () => {
        logging.log(`Server started and listening at port ${server.address().port}`);
    });
});