const mysql = require("mysql2");

const connection = mysql.createConnection({
    // UPDATE ALL THESE THINGS
    // HOST ==> MYSQL Endpoints
    host: "",
    user: "",
    password: "",
    database: ""
});

connection.connect();

module.exports = connection;
