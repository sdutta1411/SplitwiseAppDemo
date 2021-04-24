const { validationResult } = require("express-validator");
const HttpCodes = require("./../enums/http-codes");
const HttpError = require("./../models/http-error");

const Group = require("./../models/group-model");

const createGroup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Invalid inputs passed, please check your data.",
        HttpCodes.UnprocessableEntity
      )
    );
  }

  console.log(req.body);
  console.log("------------------------");
  //const { group_name, members } = req.body;

  const newGroup = new Group({
    group_name: req.body.group_name,
    members: req.body.members,
  });

  console.log(newGroup);
  console.log("------------------------");

  Group.findOne({ group_name: req.body.group_name }, (err, group) => {
    if (err) {
      console.log("err");
      res.json({
        status: false,
        message: "Error in Group Creation",
      });
    }
    if (group) {
      console.log("Exist");
      res.json({
        status: false,
        message: "Group Already Exists",
      });
    } else {
      newGroup.save((error, data) => {
        if (error) {
          console.log(error);
          res.json({
            status: false,
            message: "Group was not created",
          });
        } else {
          res.json({
            status: true,
            data: data,
            message: "Group Created Sucessfully",
          });
        }
      });
    }
  });
};

const getGroups = (req, res) => {
  const user_name = req.params.uid;

  Group.find(
    {
      "members.user_name": user_name,
      "members.user_status": { $ne: "Declined" },
    },
    (err, group) => {
      if (err) {
        res.json({
          status: false,
          message: "No Groups Found",
        });
      } else {
        res.json({
          status: true,
          data: group,
        });
      }
    }
  );
};

const getGroupInfo = (req, res) => {
  const groupname  = req.body.groupname;

  Group.findOne({ group_name: groupname }, (err, groups) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        status: true,
        group: groups,
      });
    }
  });
};

const changeStatus = (req, res) => {
  console.log(req.body);
  const { group_name, user_name, deletion } = req.body;

  if (deletion) {
    Group.updateOne(
      { group_name: group_name, "members.user_name": user_name },
      {
        $set: { "members.$.user_status": "Declined" },
      },
      (err, data) => {
        if (err) {
          console.log(error);
          res.json({
            status: false,
            message: "There are some error with query",
          });
        } else {
          res.json({
            status: true,
            data: data,
            message: "Deletion Successful",
          });
        }
      }
    );
  } else {
    Group.updateOne(
      { group_name: group_name, "members.user_name": user_name },
      {
        $set: { "members.$.user_status": "Confirmed" },
      },
      (err, data) => {
        if (err) {
          console.log(error);
          res.json({
            status: false,
            message: "There are some error with query",
          });
        } else {
          res.json({
            status: true,
            data: data,
            message: "Status Accepted",
          });
        }
      }
    );
  }
};

exports.createGroup = createGroup;
exports.getGroups = getGroups;
exports.changeStatus = changeStatus;
exports.getGroupInfo = getGroupInfo;
