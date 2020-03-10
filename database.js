const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({
  forms: [],
  records: [],
  user: { firstName: "Christopher", lastName: "Patty", isAdmin: false }
}).write();

module.exports = db;
