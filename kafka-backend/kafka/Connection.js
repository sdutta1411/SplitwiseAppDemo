var kafka = require("kafka-node");
var http = require("http");
function ConnectionProvider() {
  this.getConsumer = function (topic_name) {
    this.client = new kafka.KafkaClient("3.235.179.11:2181");
    // this.client = new kafka.Client("http://3.101.130.45:2181");
    // this.client = new kafka.KafkaClient("http://54.215.225.151:2181");
    // this.client = new kafka.KafkaClient({kafkaHost : "http://54.215.225.151:2181"});
    this.kafkaConsumerConnection = new kafka.Consumer(this.client, [
      { topic: topic_name, partition: 0 },
    ]);
    this.client.on("ready", function () {
      console.log("client ready! in kafka backend");
    });

    return this.kafkaConsumerConnection;
  };

  //Code will be executed when we start Producer
  this.getProducer = function () {
    if (!this.kafkaProducerConnection) {
      this.client = new kafka.KafkaClient("3.235.179.11:2181");
      // this.client = new kafka.Client("http://3.101.130.45:2181");
      // this.client = new kafka.KafkaClient("http://54.215.225.151:2181");
      // this.client = new kafka.KafkaClient({kafkaHost : "http://54.215.225.151:2181"});
      var HighLevelProducer = kafka.HighLevelProducer;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      //this.kafkaConnection = new kafka.Producer(this.client);
      console.log("producer ready");
    }
    return this.kafkaProducerConnection;
  };
}
exports = module.exports = new ConnectionProvider();
