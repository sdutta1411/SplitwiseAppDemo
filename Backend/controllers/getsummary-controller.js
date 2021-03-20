const connection = require('../config');

module.exports.getsummary = function (req, res) {

    let email = req.body.email;
    let type = req.body.type;

    console.log(email);

    sql_payer = `select sum(amount) as takeAmount from amountsplit where payer='${email}'`;

    sql_payee = `select sum(amount) as giveAmount from splitwise.amountsplit where payee='${email}'`;

    let take_amount = 0.0;
    let give_amount = 0.0;

    if (type == 'Payer') {
        connection.query(sql_payer, function (error, results, fields) {
            if (error) {
                res.json({
                    status: false,
                    message: 'There are some error with query'
                })
            } else {
                console.log(results[0].takeAmount);
                res.json({
                    status: true,
                    takeAmount: results[0].takeAmount
                });
            }
        });
    } else if (type == 'Payee') {
        connection.query(sql_payee, function (error, results, fields) {
            if (error) {
                res.json({
                    status: false,
                    message: 'There are some error with query'
                })
            } else {
                console.log(results[0].giveAmount);
                res.json({
                    status: true,
                    giveAmount: results[0].giveAmount
                });
            }
        });
    }

}