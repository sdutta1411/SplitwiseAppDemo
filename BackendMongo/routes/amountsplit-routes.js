const express = require('express');
const { check } = require('express-validator');

const expenseController = require('./../controllers/amountsplit-controller');

const router = express.Router();

// create splits
router.post('/createsplits', expenseController.createSplits);

module.exports = router;