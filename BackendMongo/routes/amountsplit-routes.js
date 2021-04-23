const express = require('express');
const { check } = require('express-validator');

const amountSplitController = require('./../controllers/amountsplit-controller');

const router = express.Router();

// create splits
router.post('/createsplits', amountSplitController.createSplits);

// Get Summary 
router.post('/getsummary', amountSplitController.getSummary);

//Settle Up
router.post('/settleup', amountSplitController.settleup);

module.exports = router;