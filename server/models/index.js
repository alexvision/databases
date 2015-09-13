var db = require('../db');


module.exports = {
  messages: {
    get: function (req, res) {
      return db.Messages.findAll({include: [db.Users]})
        .then(function(data){
          res.send({results: data});
        });
    }, // a function which produces all the messages

    post: function (message) {
      //TODO: Refactor out the next 4 lines
      var user;
      var room;
      return db.Users.findOrCreate({where: {Username: message.Username}})
      .then(function(userData) {
        user = userData;
        return db.Rooms.findOrCreate({where: {RoomName: message.RoomName}})
      })
      .then(function(roomData){
        room = roomData;  
      })
      .finally(function() {
        db.Messages.create({MessageText: message.MessageText, userId: user[0].dataValues.id, roomId: room[0].dataValues.id});
      });
    } 
  },

  users: {
    // Ditto as above.
    get: function (req, res) {
      console.log("req: ", req);
      // db.Messages.findAll({where: {Username: req.query.username},
      //   include: [Users])
      // .then(function(data){
      //   res.send({results: data});
      // })
    },
    post: function (message) {
      return db.getByName(message.Username)
      .then(function(row) {
        if (row.length === 0) {
          db.addToDb('INSERT INTO users (Username) VALUES (' + '"' + message.Username + '"' + ')')
        }
      });
    }
  }
};

