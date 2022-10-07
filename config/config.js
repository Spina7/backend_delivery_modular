const mysql = require("mysql");

const db = mysql.createConnection({
  host: "158.101.22.221",
  user: "root",
  password: "phoenixKz7n00.",
  database: "delivery",
  port: "9090",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Conectado a la base de datos");
});

module.exports = db;
