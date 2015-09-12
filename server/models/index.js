var db = require('../db');


module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (message) {
      //TODO: Refactor out the next 4 lines
      return db.getByName('SELECT * FROM USERS WHERE Username =' + '"' + message.username + '"' + ';')
      .then(function(row) {
        if (row.length === 0) {
          db.addToDb('INSERT INTO users (Username) VALUES (' + '"' + message.username + '"' + ');');
        }
      })
      .then(function() { 
        return db.getByName('SELECT * FROM rooms WHERE RoomName =' + '"' + message.roomname + '"' + ';')
        .then(function(roomRow){
          if (roomRow.length === 0){
            db.addToDb('INSERT INTO rooms (RoomName) VALUES (' + '"' + message.roomname + '"' + ');');
          }
        });
      })
      .then(function(){
        return db.getUserRoomId(message.username, message.roomname)
        .then(function(userRows, roomRows){
            var userId = userRows[0].UserId;
            var roomId = roomRows[0].RoomId;


            db.addToDb('INSERT INTO messages (UserId, RoomId, MessageText) VALUES (' + '"' + userId + '"' +',' + '"' + roomId + '"'+ ',' + '"' + message.message + '"' + ');');
        });
      });

    } 
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (message) {
      return db.getByName('SELECT * FROM USERS WHERE Username =' + '"' + message.username + '"' + ';')
      .then(function(row) {
        if (row.length === 0) {
          db.addToDb('INSERT INTO users (Username) VALUES (' + '"' + message.username + '"' + ');');
        }
      })
    }
  }
};

