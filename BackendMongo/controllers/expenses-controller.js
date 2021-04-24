const { validationResult } = require("express-validator");
const HttpCodes = require("./../enums/http-codes");
const HttpError = require("./../models/http-error");

const Expense = require("./../models/expenses-model");
const Group = require("./../models/group-model");

const createExpense = (req, res) => {
  const {
    group_name,
    user_email,
    user_name,
    amount,
    description,
    date,
  } = req.body;
  console.log(req.body);
  const newExpense = new Expense({
    group_name,
    user_email,
    user_name,
    amount,
    description,
    date,
  });

  newExpense
    .save()
    .then((expenseSaved) => {
      res.json({
        status: true,
        data: expenseSaved,
        message: "Expense Added",
      });
    })
    .catch((err) => {
      res.json({
        status: false,
        message: `Expense Not Saved ${err}`,
      });
    });
};

const getExpenses = (req, res) => {
  const group_name = req.params.groupid;

  Expense.find({ group_name: group_name }, (err, expenses) => {
    if (err) {
      res.json({
        status: false,
        message: "There are some error with query",
      });
    } else {
      if (expenses.length > 0) {
        res.json({
          status: true,
          data: expenses,
        });
      } else {
        res.json({
          status: false,
          message: "No Expenses for the Group",
        });
      }
    }
  });
};

const getRecentActivities = (req, res) => {
  const user_name = req.body.user_name;
  let groups = [];
  Group.find(
    {
      "members.user_name": user_name,
      "members.user_status": { $ne: "Declined" },
    },
    (err, group) => {
      if (err) {
        console.log(err);
      } else {
        console.log(group.length);
        for (let i = 0; i < group.length; i++) {
          console.log(group[i].group_name);
          groups = [...groups, group[i].group_name];
        }
        console.log(groups);
        Expense.find({ group_name: { $in: groups } }, (err, result) => {
          if (err) {
            res.json({
              status: false,
              message: "There are some error with query",
            });
          } else {
            if (result.length > 0) {
              res.json({
                status: true,
                data: result,
              });
            } else {
              res.json({
                status: false,
                message: "No Recent Activities",
              });
            }
          }
        });
      }
    }
  );
};

exports.createExpense = createExpense;
exports.getExpenses = getExpenses;
exports.getRecentActivities = getRecentActivities;
