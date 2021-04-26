const Expense = require("../../models/expenses-model");

function handle_request(msg, callback) {
  const group_name = msg.group_name;
  const user_email = msg.user_email;
  const user_name = msg.user_name;
  const amount = msg.amount;
  const description = msg.description;

  const newExpense = new Expense({
    group_name,
    user_email,
    user_name,
    amount,
    description,
  });

  newExpense
    .save()
    .then((expenseSaved) => {
      callback(null, expenseSaved);
    })
    .catch((err) => {
      callback(null, 500);
    });
}

exports.handle_request = handle_request;
