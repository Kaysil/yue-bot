const LowDB = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const Database = new FileSync(`${__dirname}/database.json`);
const db = LowDB(Database);

db.defaults({ users: [] })
.write()

module.exports = db;