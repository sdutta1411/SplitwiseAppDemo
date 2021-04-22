const express = require('express');
const { check } = require('express-validator');

const expenseController = require('./../controllers/expenses-controller');

const router = express.Router();

// create group
router.post('/addexpense', expenseController.createExpense);

module.exports = router;