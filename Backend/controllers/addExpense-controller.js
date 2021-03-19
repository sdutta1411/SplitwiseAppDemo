const connection = require('./../config.js');

module.exports.addExpense = (req, res) => {

  const sql = `INSERT INTO expenses (groupName, email, amount, description, creationDate, username) VALUES(?,?,?,?,?,?)`;

  const values = [
    req.body.groupName,
    req.body.email,
    req.body.amount,
    req.body.description,
    req.body.creationDate,
    req.body.username
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
        message: 'Expense Added'
      })
    }
  });

}