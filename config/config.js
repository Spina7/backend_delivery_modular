const mysql = require("mysql");

//CONFIGURACION ORIGINAL 

const db = mysql.createPool({
  connectionLimit: 10,
  acquireTimeout: 10000,
  host: "54.219.28.243",
  user: "root",
  password: "phoenixKz7294",
  database: "delivery",
  port: "32770",
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
