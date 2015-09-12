var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {}, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body);
      res.status(201).send();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      console.log("RECIEVED POST REQUEST")
      models.users.post(req.body);
      console.log("SENDING RESPONSE")
      res.status(201).send();
       
    }
  }
};

