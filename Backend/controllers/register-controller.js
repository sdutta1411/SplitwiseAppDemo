const connection = require('./../config.js');
const bcrypt = require('bcryptjs');

module.exports.register = (req, res) => {

  const sql = `INSERT INTO users (username, email, password, phone, currency, timezone, language) VALUES(?,?,?,?,?,?,?)`;

  //bcrypt.genSalt(10, function (err, salt) {
   // bcrypt.hash(req.body.password, salt, function (err, hash) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
      const values = [
        req.body.username,
        req.body.email,
        hash,
        req.body.phone,
        req.body.currency,
        req.body.timezone,
        req.body.language
      ];

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
   // });
  //});

}