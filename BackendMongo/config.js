const config = {};

config.db = {};
config.db.username = 'admin';
config.db.password = 'admin123';
config.db.dbname = 'splitwise';
config.db.conn = `mongodb+srv://${config.db.username}:${config.db.password}@cluster.enhda.mongodb.net/${config.db.dbname}?retryWrites=true&w=majority`;

// config.server = {};
// config.server.port = 4000;

// module.exports = config;


const mongoose = require("mongoose");

// Replace this with your MONGOURI.
//const MONGOURI = "mongodb://testuser:testpassword@ds257698.mlab.com:57698/node-auth";

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(config.db.conn, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to DB !!");
    } catch (e) {
        console.log(e);
        throw e;
    }
};

module.exports = InitiateMongoServer;