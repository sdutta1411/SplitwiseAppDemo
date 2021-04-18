const config = {};

config.db = {};
config.db.username = 'admin';
config.db.password = 'admin123';
config.db.dbname = 'splitwise';
config.db.conn = `mongodb+srv://${config.db.username}:${config.db.password}@cluster.enhda.mongodb.net/${config.db.dbname}?retryWrites=true&w=majority`;

config.server = {};
config.server.port = 4000;

module.exports = config;

