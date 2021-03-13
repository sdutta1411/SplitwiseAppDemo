const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
    host: "database-1.cxoqk6j22ojk.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "12345678",
    database: "splitwise",
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connected");
    } else {
        console.log("Connection Failed");
    }
});

module.exports = mysqlConnection;