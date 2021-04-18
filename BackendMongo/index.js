const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const config = require('./config');
const User = require('./models/UserModel');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(config.db.conn, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected');
});

app.post('/register', (req, res) => {

    const newUser = new User();

    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.name = req.body.name;
    if (req.body.phone !== '') newUser.name = req.body.phone;
    if (req.body.currency !== '') newUser.name = req.body.currency;
    if (req.body.timezone !== '') newUser.name = req.body.timezone;
    if (req.body.language !== '') newUser.name = req.body.language;

    console.log(newUser);

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {

            if (err) return err;
            //Hashing the password
            newUser.password = hash;
            newUser.save().then(useSaved => {
                res.json({
                    status: true,
                    data: useSaved,
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
});


app.post('/login', (req, res) => {
    console.log(req.body)
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, matched) => {

                if (err) return err;

                if (matched) {
                    res.json({
                        status: true,
                        message: "Login Successful"
                    });
                } else {
                    res.json({
                        status: false,
                        message: "Login Denied"
                    });
                }
            });
        } else {
            res.json({
                status: false,
                message: "User Doesnot Exits"
            });
        }
    });
});


app.listen(config.server.port, () => {
    console.log(`Listening on port ${config.server.port}`);
});