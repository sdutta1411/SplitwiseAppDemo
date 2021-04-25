const Group = require("../../models/group-model");

function handle_request(msg, callback) {
  const user_name = msg.user_name;
  console.log('Inside Handle request')
  console.log(user_name);
  Group.find(
    {
      "members.user_name": user_name,
      "members.user_status": { $ne: "Declined" },
    },
    (err, group) => {
      if (err) {
        callback(null, 500);
      } else {
        callback(null, group);
      }
    }
  );
}

exports.handle_request = handle_request;