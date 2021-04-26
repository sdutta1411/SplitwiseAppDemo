const mongoose = require("mongoose");

const AmountSplitSchema = mongoose.Schema({
  group_name: {
    type: String,
    required: true,
  },

  payer: {
    type: String,
    required: true,
  },

  payee: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("amountsplit", AmountSplitSchema);
