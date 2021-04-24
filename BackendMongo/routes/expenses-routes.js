const express = require('express');
const { check } = require('express-validator');

const expenseController = require('./../controllers/expenses-controller');

const router = express.Router();

// create expenses
router.post('/addexpense', expenseController.createExpense);

//fetch expenses by Group Name
router.get('/:groupid', expenseController.getExpenses);

//fetch recent activities
router.post('/getrecentactivities', expenseController.getRecentActivities);

module.exports = router;