const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
//const user = require('./routes/user-routes');

const User = require('./models/user-model');

const InitiateMongoServer = require('./config');

const userRoute = require('./routes/user-routes');
const groupRoute = require('./routes/group-routes');
const expenseRoute = require('./routes/expenses-routes');
const HttpCodes = require('./enums/http-codes');


// Initiate Mongo Server
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
InitiateMongoServer();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

// mongoose.connect(config.db.conn, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
//     console.log('Connected');
// });

app.use('/api/user', userRoute);
app.use('/api/group', groupRoute);
app.use('/api/expense', expenseRoute);

app.post('/register1', (req, res) => {

    const newUser = new User();

    console.log(req.body)
    console.log(User)

    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.name = req.body.name;
    newUser.phone = req.body.phone;
    newUser.currency = req.body.currency;
    newUser.timezone = req.body.timezone;
    newUser.language = req.body.language;

    console.log(newUser);

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
});


app.post('/login1', (req, res) => {
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

// PORT
const PORT = process.env.PORT || 4000;

app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`);
});