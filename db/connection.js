const mysql = require('mysql2');

var connection = mysql.createConnection(
    {
    host: "localhost",
    user: "root",
    password: "root",
    database: "employee"
    },
);

module.exports = connection;