const Group = require("../../models/group-model");

function handle_request(msg, callback) {
  const group_name = msg.group_name;
  const user_name = msg.user_name;
  const deletion = msg.deletion;

  if (deletion) {
    Group.updateOne(
      { group_name: group_name, "members.user_name": user_name },
      {
        $set: { "members.$.user_status": "Declined" },
      },
      (err, data) => {
        if (err) {
          console.log(error);
          callback(null, 500);
        } else {
          callback(null, data);
        }
      }
    );
  } else {
    Group.updateOne(
      { group_name: group_name, "members.user_name": user_name },
      {
        $set: { "members.$.user_status": "Confirmed" },
      },
      (err, data) => {
        if (err) {
          console.log(error);
          callback(null, 500);
        } else {
          console.log(data)
          callback(0, data);
        }
      }
    );
  }
}

exports.handle_request = handle_request;
