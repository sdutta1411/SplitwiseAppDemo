const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const authenticateController = require('./controllers/authenticate-controller.js');
const registerController = require('./controllers/register-controller.js');
const groupcreateController = require('./controllers/creategroup-controller.js');
const fetchgroupsController = require('./controllers/fetchGroups-controller.js');
const addexpenseController = require('./controllers/addExpense-controller.js');
const fetchexpenseController = require('./controllers/fetchExpenses-controller.js');
const changeStatusController = require('./controllers/changeStatus-controller.js');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());


app.post('/register', registerController.register);
app.post('/authenticate', authenticateController.authenticate);
app.post('/creategroup', groupcreateController.creategroup);
app.post('/fetchgroups', fetchgroupsController.fetchGroup);
app.post('/addexpense', addexpenseController.addExpense);
app.post('/fetchexpenses', fetchexpenseController.fetchExpenses);
app.post('/changestatus', changeStatusController.changeStatus);

app.listen(4000, () => {
    console.log('Listening on port 4000');
});