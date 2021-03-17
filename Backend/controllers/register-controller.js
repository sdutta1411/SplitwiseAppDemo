const connection = require('./../config.js');

module.exports.register = function (req, res) {

  const sql = `INSERT INTO users (username, email, password, phone, currency, timezone, language) VALUES(?,?,?,?,?,?,?)`;

  const values = [
    req.body.username,
    req.body.email,
    req.body.password,
    req.body.phone,
    req.body.currency,
    req.body.timezone,
    req.body.language
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
        message: 'User Registered Sucessfully'
      })
    }
  });

}