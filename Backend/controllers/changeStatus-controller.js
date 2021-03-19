const connection = require('./../config');

module.exports.changeStatus = function (req, res) {

    let groupname = req.body.groupname;
    let useremail = req.body.useremail;
    console.log(groupname);
    console.log(useremail);

    var sql = `UPDATE usergroups SET userstatus = 'Confirmed' WHERE groupname = '${groupname}' and useremail = '${useremail}'`;

    connection.query(sql, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({
                status: false,
                message: 'There are some error with query'
            })
        } else {
                res.json({
                    status: true,
                    data: results,
                    message: "Status Accepted"
                })
        }
    });
}