const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sahil@1956",
  database: "exercise"
});

module.exports = con;