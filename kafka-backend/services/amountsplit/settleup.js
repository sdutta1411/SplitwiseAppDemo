const AmountSplit = require("../../models/amountsplit-model");
const Group = require("../../models/group-model");

function handle_request(msg, callback) {
  payer = msg.payer;
  payee = msg.payee;
  payer;
  AmountSplit.deleteMany({ payer: payer }, { payee: payee })
    .then((docs) => {
      callback(null, 200);
    })
    .catch((err) => {
      callback(null, 500);
    });
}

exports.handle_request = handle_request;
