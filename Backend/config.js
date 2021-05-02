const mysql = require("mysql");

// Without Connection Pooling

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    port: '3306',
    user: "root",
    password: "shubham123",
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

//------------------------------------------------------------------------------------------


// With Connection Pooling

// const pool = mysql.createPool({
//     host: "database-1.cxoqk6j22ojk.us-east-2.rds.amazonaws.com",
//     user: "admin",
//     password: "12345678",
//     database: "splitwise",
// });

// pool.getConnection((err, connection) => {
//     if (!err) {
//         console.log('connected as id ' + connection.threadId);
//         console.log("Connected");
//     } else {
//         console.log("Connection Failed");
//     }
// });

// module.exports = pool;