const Expense = require("../../models/expenses-model");
const Group = require("../../models/group-model");

function handle_request(msg, callback) {
  const user_name = msg.email;
  let groups = [];
  Group.find(
    {
      "members.user_name": user_name,
      "members.user_status": { $ne: "Declined" },
    },
    (err, group) => {
      if (err) {
        console.log(err);
      } else {
        console.log(group.length);
        for (let i = 0; i < group.length; i++) {
          console.log(group[i].group_name);
          groups = [...groups, group[i].group_name];
        }
        console.log(groups);
        Expense.find({ group_name: { $in: groups } }, (err, result) => {
          if (err) {
            callback(null, 500);
          } else {
            if (result.length > 0) {
              callback(null, result);
            } else {
              callback(null, 500);
            }
          }
        }).sort({ date: -1 });
      }
    }
  );
}

exports.handle_request = handle_request;
