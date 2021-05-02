const connection = require('./../config');
const bcrypt = require('bcryptjs');

module.exports.authenticate = (req, res) => {

  let email = req.body.email;
  let password = req.body.password;

  console.log(email);
  console.log(password);

  connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
    if (results.length > 0) {
      console.log(results[0].password);
      const comparison = bcrypt.compare(req.body.password, results[0].password).then(match => {
        console.log(match);
        if (match) {
          res.json({
            status: true,
            message: "Login Successful",
            userDetails: results[0]
          });
        } else {
          res.json({
            status: false,
            message: "Login Denied"
          });
        }
      }).catch(err => {
        console.log(err)
      })
    } else {
      res.json({
        status: false,
        message: "User Doesnot Exits"
      });
    }

  });
}
