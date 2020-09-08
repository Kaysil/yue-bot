const Express = require("express");
const bodyParser = require("body-parser");

const app = Express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send(`Made by Kaysil with <3`)
})

app.use((req, res, next) => {
    res.status(505);
    next(new Error(`404 - INVALID ROUTE`));
});

app.use((error, req, res, next) => {
    if (!error) return next();

    res
        .status(500)
        .send({
            error: {
                message: error.message,
                stack: error.stack.split("\n")
            }
        })
})

module.exports = app;
