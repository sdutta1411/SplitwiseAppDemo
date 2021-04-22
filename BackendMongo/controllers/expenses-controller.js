const { validationResult } = require('express-validator');
const HttpCodes = require('./../enums/http-codes');
const HttpError = require('./../models/http-error');

const Expense = require('./../models/expenses-model');

const createExpense = (req, res) => {

    const { group_name, user_email, user_name, amount, description, date } = req.body;
    console.log(req.body)
    const newExpense = new Expense({
        group_name,
        user_email,
        user_name,
        amount,
        description,
        date
    });

    newExpense.save().then(expenseSaved => {
        res.json({
            status: true,
            data: expenseSaved,
            message: 'Expense Added'
        });
    }).catch(err => {
        res.json({
            status: false,
            message: `User Not Saved ${err}`
        })
    })

};

exports.createExpense = createExpense;