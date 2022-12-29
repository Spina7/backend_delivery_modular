const mysql = require("mysql");

//CONFIGURACION ORIGINAL 

const db = mysql.createPool({
  connectionLimit: 10,
  acquireTimeout: 10000,
  host: "140.238.157.201",
  user: "admin_envyc",
  password: "phoenixKz7n00.",
  database: "admin_delivery",
  port: "3306",
});

//CONFIGURACION EDUARDO
/*
const db = mysql.createPool({
  connectionLimit: 10,
  acquireTimeout: 10000,
  host: "localhost",
  user: "root",
  password: "3332",
  database: "sistema_delivery",
  //port: "9090",
});
*/

db.query("SELECT 1 + 1 AS solution", function (err) {
  if (err) throw err;
  console.log("Conectado a la base de datos");
});

module.exports = db;
