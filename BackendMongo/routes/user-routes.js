const express = require("express");
const { check } = require("express-validator");

const userController = require("./../controllers/user-controller");

const router = express.Router();

//get all users
router.get("/", userController.getAllUsers);

// get user by username
router.get("/:uid", userController.getUserInfo);

// update user account information
router.patch("/:uid", userController.updateUserInfo);

// sign-in user
router.post(
  "/login",
  [check("username").not().isEmpty(), check("password").not().isEmpty()],
  userController.signin
);

// sign-up user
router.post("/register", userController.signup);

module.exports = router;
