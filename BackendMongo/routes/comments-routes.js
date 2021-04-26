const express = require("express");
const { check } = require("express-validator");
const kafka = require("../kafka/client");

const commentsController = require("./../controllers/comments-controller");

const router = express.Router();

// create comment
//router.post("/postcomment", commentsController.createComment);
router.post("/postcomment", (req, res) => {
  console.log("req.body", req.body);

  kafka.make_request("postcomment", req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const data = {
        data: result,
        status: true,
      };
      res.send(data);
    }
  });
});

//fetch comments by Expense Id
//router.get("/:expenseid", commentsController.getComments);

router.post("/getcomment", (req, res) => {
  console.log(req.body);

  kafka.make_request("getcomment", req.body, (err, result) => {
    if (err) {
      console.log("returning from err block");
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
