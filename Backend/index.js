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
const createsplitsController = require('./controllers/createsplits-controller.js');
const getusernameController = require('./controllers/getUsername-controller.js');
const getsummaryController = require('./controllers/getsummary-controller.js');
const updateuserController = require('./controllers/updateuser-controller.js');
const fetchAllUserController = require('./controllers/fetchAllUsers-controller.js');
const settleupController = require('./controllers/settleup-controller.js');
const recentactivitiesController = require('./controllers/recentactivities-controller.js');

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
app.post('/createsplits', createsplitsController.createsplits);
app.post('/getusername', getusernameController.getusername);
app.post('/getsummary', getsummaryController.getsummary);
app.post('/updateuser', updateuserController.updateuser);
app.post('/fetchallusers', fetchAllUserController.fetchAllUser);
app.post('/settleup', settleupController.settleup);
app.post('/recentactivities', recentactivitiesController.recentactivities);

app.listen(4000, () => {
    console.log('Listening on port 4000');
});