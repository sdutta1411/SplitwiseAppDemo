const { validationResult } = require("express-validator");
const HttpCodes = require("./../enums/http-codes");
const HttpError = require("./../models/http-error");

const Comments = require("./../models/comments-model");

const createComment = (req, res) => {
  const { expense_id, created_by, content, created_at } = req.body;

  const newComments = new Comments({
    expense_id,
    created_by,
    content,
    created_at,
  });

  newComments
    .save()
    .then((commentsSaved) => {
      res.json({
        status: true,
        data: commentsSaved,
        message: "Comment Added",
      });
    })
    .catch((err) => {
      res.json({
        status: false,
        message: `Comment Not Saved ${err}`,
      });
    });
};

const getComments = (req, res) => {
  const expense_id = req.params.expenseid;
  console.log(expense_id);
  Comments.find({ expense_id: expense_id }, (err, comments) => {
    if (err) {
      res.json({
        status: false,
        message: "There are some error with query",
      });
    } else {
      if (comments.length > 0) {
        res.json({
          status: true,
          data: comments,
        });
      } else {
        res.json({
          status: false,
          message: "No Comments for the Expense",
        });
      }
    }
  });
};

exports.createComment = createComment;
exports.getComments = getComments;
