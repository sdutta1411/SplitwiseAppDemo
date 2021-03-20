const connection = require('./../config');

module.exports.settleup = function (req, res) {

    let payer = req.body.payer;
    let payee = req.body.payee;

    console.log(payer);
    console.log(payee);

    var sql = `DELETE FROM amountsplit WHERE payer = '${payer}' and payee = '${payee}'`;

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
                message: "Settle Up Successful"
            })
        }
    });

}