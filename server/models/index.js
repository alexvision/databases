var db = require('../db');


module.exports = {
  messages: {
    get: function (req, res) {
      return db.getAllMessages()
        .then(function(data){
          res.send(data);
        });
    }, // a function which produces all the messages

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
          console.log(roomRow)
          if (roomRow.length === 0){
            db.addToDb('INSERT INTO rooms (RoomName) VALUES (' + '"' + message.roomname + '"' + ');');
          }
        });
      })
      .then(function(){
        return db.getUserRoomId(message.username, message.roomname)
        .then(function(array){
            //console.log("user: " + userRows);

            var userId = array[0][0].UserId;
            var roomId = array[1][0].RoomId;
            console.log(userId, roomId);

            db.addToDb('INSERT INTO messages (UserId, RoomId, MessageText) VALUES (' + userId +',' + roomId + ',' + '"' + message.message + '"' + ');');
        });
      });

    } 
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (message) {
      return db.getByName('SELECT * FROM USERS WHERE Username =' + '"' + message.username + '"')
      .then(function(row) {
        //console.log(row.length)
        if (row.length === 0) {
          db.addToDb('INSERT INTO users (Username) VALUES (' + '"' + message.username + '"' + ')')
        }
      });
    }
  }
};

