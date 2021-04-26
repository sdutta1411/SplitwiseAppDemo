const AmountSplit = require("../../models/amountsplit-model");
const Group = require("../../models/group-model");

function handle_request(msg, callback) {
  const payer = msg.payer;
  const payee = msg.payee;
  console.log('Inside get summary')
  console.log(msg)
  if (payer) {
    AmountSplit.aggregate([
      {
        $match: { payer: payer },
      },
      {
        $group: {
          _id: "$payer",
          takeAmount: { $sum: "$amount" },
        },
      },
    ])
      .then((docs) => {
        console.log(docs);
        callback(null, docs);
      })
      .catch((err) => {
        callback(null, 500);
      });
  } else if (payee) {
    AmountSplit.aggregate([
      {
        $match: { payee: payee },
      },
      {
        $group: {
          _id: "$payee",
          giveAmount: { $sum: "$amount" },
        },
      },
    ])
      .then((docs) => {
        console.log(docs);
        callback(null, docs);
      })
      .catch((err) => {
        callback(null, 500);
      });
  }
}

exports.handle_request = handle_request;
