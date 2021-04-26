const express = require("express");
const { check } = require("express-validator");
const kafka = require("../kafka/client");

const amountSplitController = require("./../controllers/amountsplit-controller");

const router = express.Router();

// create splits
//router.post('/createsplits', amountSplitController.createSplits);
router.post("/createsplit", (req, res) => {
  console.log("inside postmethod for create split backend");
  console.log("req.body", req.body);

  kafka.make_request("amountsplit", req.body, (err, result) => {
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

// Get Summary
//router.post("/getsummary", amountSplitController.getSummary);

// Get Summary
router.post("/getsummary", (req, res) => {
  kafka.make_request("getsummary", req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const data = {
        data: result,
        status: true,
      };
      console.log(result);
      res.send(data);
    }
  });
});

//Settle Up
//router.post("/settleup", amountSplitController.settleup);
router.post("/settleup", (req, res) => {
  kafka.make_request("settleup", req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("done");
      const data = {
        message: "Settle Up Successful",
        status: true,
      };
      res.send(data);
    }
  });
});

module.exports = router;
