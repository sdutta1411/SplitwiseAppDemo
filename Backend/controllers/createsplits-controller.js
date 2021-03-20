const connection = require('./../config.js');

module.exports.createsplits = (req, res) => {

    const groupname = req.body.groupname;
    const payeremail = req.body.useremail;
    const amount = req.body.amount;
    let num_members = 0;
    const confirmed = 'Confirmed';
    let groupmembers = [];
    let success = true;


    const sql = `SELECT * FROM usergroups where groupname='${groupname}' and userstatus= '${confirmed}'`;

    const sql2 = 'INSERT INTO amountsplit (groupname, payer, payee, amount) values(?,?,?,?)';

    connection.query(sql, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({
                status: false,
                message: 'There are some error with query'
            })
        } else {
            groupmembers = results;
            console.log(groupmembers);
            console.log(groupmembers.length);
            num_members = groupmembers.length;
            let amt_each = amount / num_members;
            console.log(amt_each);
            for (var i = 0; i < groupmembers.length; i++) {
                if (groupmembers[i].useremail !== payeremail) {
                    let values = [
                        groupname,
                        payeremail,
                        groupmembers[i].useremail,
                        amt_each
                    ];

                    connection.query(sql2, values, function (error, results, fields) {
                        if (error) {
                            console.log(error);
                            success = false;
                        }
                    });
                }
            }
        }
    });


    if (success) {
        res.json({
            status: true,
            message: 'Amount Splitted Sucessfully'
        })
    } else {
        res.json({
            status: false,
            message: 'Amount Split was unsuccesful'
        })
    }
}