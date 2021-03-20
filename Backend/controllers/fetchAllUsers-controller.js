const connection = require('./../config');

module.exports.fetchAllUser = function (req, res) {

    connection.query('SELECT username,email FROM users', function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'There are some error with query'
            })
        } else {
            res.json({
                status: true,
                data: results
            })
        }
    });
}