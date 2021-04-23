const { validationResult } = require("express-validator");
const HttpCodes = require("./../enums/http-codes");
const HttpError = require("./../models/http-error");

const AmountSplit = require("./../models/amountsplit-model");
const Group = require("./../models/group-model");

const createSplits = (req, res) => {
  const { groupname, payeremail, amount } = req.body;
  let num_members = 0;
  const confirmed = "Confirmed";
  let groupmembers = [];
  let confMembers = [];
  let success = true;
  console.log(req.body);

  Group.findOne({ group_name: groupname }, (err, groups) => {
    if (err) {
      console.log(err);
    } else {
      console.log(groups);
      groupmembers = groups.members;
      for (let i = 0; i < groupmembers.length; i++) {
        if (groupmembers[i].user_status === confirmed) {
          num_members++;
        }
      }

      let amt_each = amount / num_members;

      for (let i = 0; i < groupmembers.length; i++) {
        if (groupmembers[i].user_status === confirmed) {
          if (groupmembers[i].user_name !== payeremail) {
            const data = {
              group_name: groupname,
              payer: payeremail,
              payee: groupmembers[i].user_name,
              amount: amt_each,
            };
            confMembers = [...confMembers, data];
          }
        }
      }
      console.log("**************************");
      console.log(confMembers);

      AmountSplit.insertMany(confMembers)
        .then((docs) => {
          res.json({
            status: true,
            message: "Amount Splitted Sucessfully",
          });
        })
        .catch((err) => {
          res.json({
            status: false,
            message: "Amount Split was unsuccesful",
          });
        });
    }
  });
};

const getSummary = (req, res) => {
  const { payer, payee } = req.body;

  if (payer) {
    AmountSplit.aggregate([
      {
        $match: { payer: payer },
      },
      {
        $group: {
          _id: "$payer",
          takeAmount: { $sum: "$amount" },
        },
      },
    ])
      .then((docs) => {
        console.log(docs);
        res.json({
          status: true,
          takeAmount: docs,
        });
      })
      .catch((err) => {
        res.json({
          status: false,
          message: "There are some error with query",
        });
      });
  } else if (payee) {
    AmountSplit.aggregate([
      {
        $match: { payee: payee },
      },
      {
        $group: {
          _id: "$payee",
          giveAmount: { $sum: "$amount" },
        },
      },
    ])
      .then((docs) => {
        console.log(docs);
        res.json({
          status: true,
          giveAmount: docs,
        });
      })
      .catch((err) => {
        res.json({
          status: false,
          message: "There are some error with query",
        });
      });
  }
};

const settleup = (req, res) => {
  const { payer, payee } = req.body;
  AmountSplit.deleteMany({ payer: payer }, { payee: payee })
    .then((docs) => {
      res.json({
        status: true,
        message: "Settle Up Successful",
      });
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "There are some error with query",
      });
    });
};

exports.createSplits = createSplits;
exports.getSummary = getSummary;
exports.settleup = settleup;
