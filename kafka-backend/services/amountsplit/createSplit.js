const AmountSplit = require("../../models/amountsplit-model");
const Group = require("../../models/group-model");

function handle_request(msg, callback) {
  const groupname = msg.groupname;
  const payeremail = msg.payeremail;
  const amount = msg.amount;
  let num_members = 0;
  const confirmed = "Confirmed";
  let groupmembers = [];
  let confMembers = [];
  let success = true;

  console.log('Inside Create Split')
  console.log(groupname);

  Group.findOne({ group_name: groupname }, (err, groups) => {
    if (err) {
      console.log(err);
    } else {
      console.log(groups);

      groupmembers = groups.members;
      for (let i = 0; i < groupmembers.length; i++) {
        if (groupmembers[i].user_status === confirmed) {
          num_members++;
        }
      }

      let amt_each = amount / num_members;

      for (let i = 0; i < groupmembers.length; i++) {
        if (groupmembers[i].user_status === confirmed) {
          if (groupmembers[i].user_name !== payeremail) {
            const data = {
              group_name: groupname,
              payer: payeremail,
              payee: groupmembers[i].user_name,
              amount: amt_each,
            };
            confMembers = [...confMembers, data];
          }
        }
      }
      console.log("**************************");
      console.log(confMembers);

      AmountSplit.insertMany(confMembers)
        .then((docs) => {
          callback(null, 200);
        })
        .catch((err) => {
          callback(null, 500);
        });
    }
  });
}

exports.handle_request = handle_request;
