const { validationResult } = require('express-validator');
const HttpCodes = require('./../enums/http-codes');
const HttpError = require('./../models/http-error');

const express = require("express");
const bcrypt = require("bcryptjs");

const User = require('./../models/user-model');

// get user details by userId
const getUserInfo = async (req, res, next) => {
    const email = req.params.uid;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', HttpCodes.UnprocessableEntity)
        );
    }
    User.findOne(
        { email: email },
        function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        }
    );
};

// update existing user info by id
const updateUserInfo = async (req, res, next) => {
    const userId = req.params.uid;
    let params = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', HttpCodes.UnprocessableEntity)
        );
    }

    User.findByIdAndUpdate(userId, params,
        function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Updated User : ", docs);
                res.json({
                    status: true,
                    data: docs,
                    message: 'User Details Updated Sucessfully'
                })
            }
        })
    
};

// signin user
const signin = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    let existingUser;

    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            'Logging in failed, please try again later.',
            HttpCodes.InternalServerError
        );
        return next(error);
    }

    bcrypt.compare(password, existingUser.password, (err, matched) => {

        if (err) return err;

        if (matched) {
            res.json({
                status: true,
                message: "Login Successful",
                userDetails: existingUser
            });
        } else {
            const error = new HttpError(
                'Invalid credentials, could not log you in.',
                HttpCodes.UnauthorizedClient
            );
            return next(error);
        }
    });

    // if (existingUser.password !== password) {
    //     const error = new HttpError(
    //         'Invalid credentials, could not log you in.',
    //         HttpCodes.UnauthorizedClient
    //     );
    //     return next(error);
    // }

    // res.json({ message: 'Logged in!' });
};


// register user
const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', HttpCodes.UnprocessableEntity)
        );
    }
    const { email, password, name, phone, currency, timezone, language } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            HttpCodes.InternalServerError
        );
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError(
            'User exists already, please login instead.',
            HttpCodes.UnprocessableEntity
        );
        return next(error);
    }

    const newUser = new User({
        email,
        password,
        name,
        phone,
        currency,
        timezone,
        language
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) return err;
            //Hashing the password
            newUser.password = hash;
            // Creating collection
            newUser.save().then(userSaved => {
                res.json({
                    status: true,
                    data: userSaved,
                    message: 'User Registered Sucessfully'
                });
            }).catch(err => {
                res.json({
                    status: false,
                    message: `User Not Saved ${err}`
                })
            })
        });
    });

    // try {
    //     await createdUser.save();
    // } catch (err) {
    //     const error = new HttpError(
    //         'Signing up failed, please try again.',
    //         HttpCodes.InternalServerError
    //     );
    //     return next(error);
    // }

    // res.status(HttpCodes.Created).json({ user: createdUser.toObject({ getters: true }) });
};

exports.signin = signin;
exports.signup = signup;
exports.getUserInfo = getUserInfo;
exports.updateUserInfo = updateUserInfo;