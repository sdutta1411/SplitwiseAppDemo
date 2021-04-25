const express = require("express");
const { check } = require("express-validator");
const kafka = require("../kafka/client");

const groupController = require("./../controllers/group-controller");

const router = express.Router();

// get groups by username
//router.get('/:uid', groupController.getGroups);

// get groups by username
router.post("/getGroup", (req, res) => {
  console.log("inside method for get group by username backend");
  console.log("req.body", req.body);

  kafka.make_request("getgroups", req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// get groups by GroupName
//router.post("/groupInfo", groupController.getGroupInfo);


//Change userStatus in the Group
//router.post("/changestatus", groupController.changeStatus);

//Change userStatus in the Group
router.post("/changestatus", (req, res) => {
  console.log("inside method to change userStatus backend");
  console.log("req.body", req.body);

  kafka.make_request("changegroupstatus", req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// create group
//router.post("/creategroup", groupController.createGroup);

// create group
router.post("/creategroup", (req, res) => {
  console.log("inside postmethod for create group backend");
  console.log("req.body", req.body);

  kafka.make_request("creategroup", req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

module.exports = router;
