const Group = require("../../models/group-model");

function handle_request(msg, callback) {
  const newGroup = new Group({
    group_name: msg.group_name,
    members: msg.members,
  });

  console.log(newGroup);
  console.log("------------------------");

  Group.findOne({ group_name: msg.group_name }, (err, group) => {
    if (err) {
      console.log("err");
      callback(null, 500);
    }
    if (group) {
      console.log("Exist");
      callback(null, 299);
    } else {
      newGroup.save((error, data) => {
        if (error) {
          console.log(error);
          callback(null, 500);
        } else {
          callback(null, data);
        }
      });
    }
  });
}

exports.handle_request = handle_request;
