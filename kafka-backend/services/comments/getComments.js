const Comments = require("../../models/comments-model");

function handle_request(msg, callback) {
  const expense_id = msg.expense_id;

  console.log("Inside GET Comments");

  Comments.find({ expense_id: expense_id }, (err, comments) => {
    if (err) {
      console.log("coming to the service");
      callback(null, 500);
    } else {
      console.log("Entered okay block");
      if (comments.length > 0) {
        callback(null, comments);
      } else {
        console.log("SOme error with query");
        callback(null, 500);
      }
    }
  });
}

exports.handle_request = handle_request;
