const mongoose = require("mongoose");

const CommentsSchema = mongoose.Schema({
  expense_id: {
    type: String,
    required: true,
  },

  created_by: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("comments", CommentsSchema);
