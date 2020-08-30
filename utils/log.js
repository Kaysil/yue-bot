module.exports = class Logging {
    constructor (prefix) {
        this.prefix = prefix || "BOT";
        this.prefix = `[${this.prefix}]`;
    };

    log (...args) {
        console.log("\x1b[32m" + this.prefix, ...args);
    };

    warn (...args) {
        console.log("\x1b[33m" + this.prefix, ...args);
    };

    err (...args) {
        console.log("\x1b[31m" + this.prefix, ...args);
    };
}