const express = require('express');
const { check } = require('express-validator');

const userController = require('./../controllers/user-controller');

const router = express.Router();

// get user by username
router.get('/:uid', userController.getUserInfo);

// update user account information
router.patch('/:uid', userController.updateUserInfo)

// sign-in user
router.post(
    '/login',
    [
        check('username')
            .not()
            .isEmpty(),
        check('password')
            .not()
            .isEmpty()
    ],
    userController.signin
);

// sign-up user
router.post(
    '/register',
    [
        check('email')
            .not()
            .isEmpty(),
        check('password').isLength({ min: 5 }),
        check('name')
            .not()
            .isEmpty()
    ],
    userController.signup
);

module.exports = router;