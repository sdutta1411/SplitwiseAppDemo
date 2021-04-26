const express = require("express");
const { check } = require("express-validator");
const kafka = require("../kafka/client");

const expenseController = require("./../controllers/expenses-controller");

const router = express.Router();

// create expenses
//router.post('/addexpense', expenseController.createExpense);

router.post("/addexpense", (req, res) => {
  console.log("inside postmethod for create group backend");
  console.log("req.body", req.body);

  kafka.make_request("addexpense", req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//fetch expenses by Group Name
//router.get('/:groupid', expenseController.getExpenses);

router.get("/:groupid", (req, res) => {
  console.log("inside postmethod for create group backend");
  const group_name = req.params.groupid;
  console.log(group_name);
  kafka.make_request("getexpense", group_name, (err, result) => {
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

//fetch recent activities
//router.post("/getrecentactivities", expenseController.getRecentActivities);

router.post("/getrecentactivities", (req, res) => {
  console.log("Inside RecentActiviities");
  console.log("req.body", req.body);

  kafka.make_request("recentactivites", req.body, (err, result) => {
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

module.exports = router;
