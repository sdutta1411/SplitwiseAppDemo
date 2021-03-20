const connection = require('../config');

module.exports.fetchExpenses = function (req, res) {

    let groupName = req.body.groupName;
    console.log(groupName);

    if (!groupName) {
        connection.query('SELECT * FROM expenses order by creationDate desc', [groupName], function (error, results, fields) {
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
        })
    } else {
        connection.query('SELECT * FROM expenses WHERE groupName = ? order by creationDate desc', [groupName], function (error, results, fields) {
            if (error) {
                res.json({
                    status: false,
                    message: 'There are some error with query'
                })
            } else {
                if (results.length > 0) {
                    res.json({
                        status: true,
                        data: results
                    })
                }
                else {
                    res.json({
                        status: false,
                        message: "No Expenses for the Group"
                    });
                }
            }
        });
    }
}