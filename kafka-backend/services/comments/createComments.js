const Comments = require("../../models/comments-model");

function handle_request(msg, callback) {
  const expense_id = msg.expense_id;
  const created_by = msg.created_by;
  const content = msg.content;

  const newComments = new Comments({
    expense_id,
    created_by,
    content,
  });

  newComments
    .save()
    .then((commentsSaved) => {
      callback(null, commentsSaved);
    })
    .catch((err) => {
      callback(null, 500);
    });
}

exports.handle_request = handle_request;
