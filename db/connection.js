const mysql = require('mysql2');

var connection = mysql.createConnection(
    {
    host: "localhost",
    port: 3000,
    user: "root",
    password: "root",
    database: "employee"
    },
);

module.exports = connection;