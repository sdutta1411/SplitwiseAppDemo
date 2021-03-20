const connection = require('./../config.js');

module.exports.updateuser = (req, res) => {

    const sql = `UPDATE users SET  username=?,phone=?,currency=?,timezone=? ,language=? WHERE email = ?`;

    const values = [
        req.body.username,
        req.body.phone,
        req.body.currency,
        req.body.timezone,
        req.body.language,
        req.body.email
    ];

    console.log(values);

    connection.query(sql, values, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.json({
                status: false,
                message: 'There are some error with query'
            })
        } else {
            res.json({
                status: true,
                data: results,
                message: 'User Details Updated Sucessfully'
            })
        }
    });

}