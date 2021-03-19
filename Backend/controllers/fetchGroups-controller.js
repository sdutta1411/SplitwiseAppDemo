const connection = require('./../config');

module.exports.fetchGroup = function (req, res) {

    let email = req.body.email;
    console.log(email);

    connection.query('SELECT * FROM usergroups WHERE useremail = ?', [email], function (error, results, fields) {
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
                    message: "No Groups for the User"
                });
            }
        }
    });
}