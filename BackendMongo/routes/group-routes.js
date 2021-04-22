const express = require('express');
const { check } = require('express-validator');

const groupController = require('./../controllers/group-controller');

const router = express.Router();

// get groups by username
router.get('/:uid', groupController.getGroups);

// get groups by GroupName
router.post('/groupInfo', groupController.getGroupInfo);

//Change userStatus in the Group
router.post('/changestatus', groupController.changeStatus);

// create group
router.post('/creategroup', groupController.createGroup);

module.exports = router;