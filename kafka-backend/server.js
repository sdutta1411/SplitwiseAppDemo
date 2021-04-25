const mongoose = require("mongoose");
var connection = new require("./kafka/Connection");

const config = {};

config.db = {};
config.db.username = 'admin';
config.db.password = 'admin123';
config.db.dbname = 'splitwise';
config.db.conn = `mongodb+srv://${config.db.username}:${config.db.password}@cluster.enhda.mongodb.net/${config.db.dbname}?retryWrites=true&w=majority`;

//const URI = "mongodb+srv://pavanbhatt:p1234567@cluster0.lndhs.mongodb.net/splitwise?retryWrites=true&w=majority&ssl=true";

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10,
  bufferMaxEntries: 0,
};

const mongoConnection = async () => {
  await mongoose.connect(config.db.conn, options, (err, res) => {
    if (err) {
      console.log("error:", err);
    } else {
      console.log("MongoDB connected");
    }
  });
};

mongoConnection();

//topics files

let creategroup = require("./services/groups/createGroup");
let getgroups = require("./services/groups/getGroups");
let changegroupstatus = require("./services/groups/changeStatus");
// let addexpense = require("./services/expense/createExpense");
// let getexpense = require("./services/expense/getExpense");
// let amountsplit = require("./services/amountsplit/amountsplit-controller");

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log("123", data.data);
    fname.handle_request(data.data, function (err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, function (err, data) {
        console.log(data);
      });
      return;
    });
  });
}

function response(data, res, producer) {
  console.log("after handle", res);
  var payloads = [
    {
      topic: data.replyTo,
      messages: JSON.stringify({
        correlationId: data.correlationId,
        data: res,
      }),
      partition: 0,
    },
  ];
  producer.send(payloads, function (err, data) {
    //console.log('producer send', data);
    if (err) {
      console.log("Error when producer sending data", err);
    } else {
      console.log(data);
    }
  });
  return;
}

// // Add your TOPICs here
handleTopicRequest("creategroup", creategroup);
handleTopicRequest("getgroups", getgroups);
handleTopicRequest("changegroupstatus", changegroupstatus);
// handleTopicRequest("addexpense", addexpense);
// handleTopicRequest("getexpense", getexpense);
// handleTopicRequest("amountsplit", amountsplit);
