var Sequelize = require('sequelize');

module.exports.sequelize = sequelize = new Sequelize('chatsequelize', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports.Rooms = Rooms = sequelize.define('rooms', {
  RoomName: Sequelize.STRING,
});

module.exports.Users = Users = sequelize.define('users', {
  Username: Sequelize.STRING,
});

module.exports.Messages = Messages = sequelize.define('messages', {
  MessageText: Sequelize.STRING
});

Messages.belongsTo(Users);
Users.hasMany(Messages, {as: 'Messages'});
Messages.belongsTo(Rooms);
Rooms.hasMany(Messages, {as: 'Messages'});

// Users.sync();
// Rooms.sync();
// Messages.sync();

module.exports.getAllMessages = function(){
  Messages.findAll({
    attributes: ['MessageText', 'MessageId'],
    include: [Rooms, Users]
  })
};


module.exports.getByName = function(table, constraints) {
  return table.findAll({
    where: constraints
  });
};

module.exports.addToDb = function(table, values){
  table.create(values);
}

module.exports.getUserRoomId = function(username, roomname) {
  var userId, roomId
  return getByName(Users, {Username: username})
    .then(function(user){
      userId = user.UserId;
      return getByName(Rooms, {RoomName: roomname})
    })
    .finally(function(room){
      roomId = room.RoomId;
      return [userId, roomId];
    });  
} 


// var mysql = require('mysql');
// var Promise = require('bluebird');


// // Create a database connection and export it from this file.
// // You will need to connect with the user "root", no password,
// // and to the database "chat".


// var connection = mysql.createConnection(
//   {
//     host: 'localhost',
//     user: 'root',
//     database: 'chat',
//   }
// );

// module.exports.createConnection = function(){
//   connection.connect();
// }




 
