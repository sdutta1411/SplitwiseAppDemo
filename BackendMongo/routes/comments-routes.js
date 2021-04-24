const express = require("express");
const { check } = require("express-validator");

const commentsController = require("./../controllers/comments-controller");

const router = express.Router();

// create comment
router.post("/postcomment", commentsController.createComment);

//fetch comments by Expense Id
router.get('/:expenseid', commentsController.getComments);

module.exports = router;
