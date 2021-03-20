const connection = require('./../config');

module.exports.recentactivities = function (req, res) {

    let email = req.body.email;
    console.log(email);
    const confirmed = 'Confirmed';
    
    const sql = `SELECT groupName FROM usergroups where useremail='${email}' and userstatus= '${confirmed}'`;

    const sql2 = `SELECT * FROM expenses WHERE groupName in (${sql}) order by creationDate desc`;

    connection.query(sql2, function (error, activities, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'There are some error with query'
            });
        } else {
            res.json({
                status: true,
                data: activities
            })
        }
    });
}