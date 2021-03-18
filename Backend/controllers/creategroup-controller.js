const connection = require('./../config.js');

module.exports.creategroup = (req, res) => {

    const sql = `INSERT INTO usergroups (groupname, useremail, userstatus) VALUES(?,?,?)`;

    let success = true;

    console.log(req.body.groupName);
    console.log(req.body.emailList[0].email);
    console.log(req.body.emailList.length);

    for (var i = 0; i < req.body.emailList.length; i++) {
        let values = [
            req.body.groupName,
            req.body.emailList[i].email,
            req.body.status,
        ];
        connection.query(sql, values, function (error, results, fields) {
            if (error) {
                console.log(error);
                success = false;
            }
        });
    }

    if (success) {
        res.json({
            status: true,
            message: 'Group Created Sucessfully'
        })
    } else {
        res.json({
            status: false,
            message: 'Group was not created'
        })
    }
}