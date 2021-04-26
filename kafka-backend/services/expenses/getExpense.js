const Expense = require("../../models/expenses-model");

function handle_request(msg, callback) {
  const group_name = msg;
  console.log(group_name);
  Expense.find({ group_name: group_name }, (err, expenses) => {
    if (err) {
      callback(null, 500);
    } else {
      if (expenses.length > 0) {
        callback(null, expenses);
      } else {
        callback(null, 500);
      }
    }
  });
}

exports.handle_request = handle_request;
