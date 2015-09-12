var db = require('../db');


module.exports = {
  messages: {
    get: function (req, res) {
      return db.getAllMessages()
        .then(function(data){
          res.send({results: data});
        });
    }, // a function which produces all the messages

    post: function (message) {
      //TODO: Refactor out the next 4 lines
      return db.getByName('SELECT * FROM USERS WHERE Username =' + '"' + message.Username + '"' + ';')
      .then(function(row) {
        if (row.length === 0) {
          db.addToDb('INSERT INTO users (Username) VALUES (' + '"' + message.Username + '"' + ');');
        }
      })
      .then(function() { 
        return db.getByName('SELECT * FROM rooms WHERE RoomName =' + '"' + message.RoomName + '"' + ';')
        .then(function(roomRow){
          console.log(roomRow)
          if (roomRow.length === 0){
            db.addToDb('INSERT INTO rooms (RoomName) VALUES (' + '"' + message.RoomName + '"' + ');');
          }
        });
      })
      .then(function(){
        return db.getUserRoomId(message.Username, message.RoomName)
        .then(function(array){
            //console.log("user: " + userRows);

            var userId = array[0][0].UserId;
            var roomId = array[1][0].RoomId;

            console.log("mesage text: " + message.MessageText);
            db.addToDb('INSERT INTO messages (UserId, RoomId, MessageText) VALUES (' + userId +',' + roomId + ',' + '"' + message.MessageText + '"' + ');');
        });
      });

    } 
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (message) {
      return db.getByName('SELECT * FROM USERS WHERE Username =' + '"' + message.Username + '"')
      .then(function(row) {
        //console.log(row.length)
        if (row.length === 0) {
          db.addToDb('INSERT INTO users (Username) VALUES (' + '"' + message.Username + '"' + ')')
        }
      });
    }
  }
};

