var mysql = require('mysql');
var Promise = require('bluebird');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


var connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    database: 'chat',
  }
);

module.exports.createConnection = function(){
  connection.connect();
}

// var queryString = 'SELECT * FROM messages';
// connection.query(queryString, function(err, rows, fields) {
//     if (err) throw err;
 
//     for (var i in rows) {
//         console.log(rows);
//     }
// });

module.exports.getByName = function(queryString) {
  return new Promise(function(resolve,reject) {
    connection.query(queryString, function(err, rows, fields) {
      if (err) reject(err);

      resolve(rows);
    });
  });   

  //connection.end();
};

module.exports.addToDb = function(queryString){
  //connection.connect();
  connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;

    console.log('Added User to DB')

  });   

  // connection.end();
}

module.exports.getUserRoomId = function(username, roomname) {
  return new Promise(function(resolve,reject){
    var queryString = 'SELECT UserId FROM users WHERE Username =' + '"' + username + '"' + ';';

    connection.query(queryString, function(err, userRows, userFields){
      if (err) reject(err);
       resolve(userRows); 
    });   
  })
    .then(function(userRows) { 
      return new Promise(function(resolve,reject){
        var queryString = 'SELECT RoomId FROM rooms WHERE RoomName=' + '"' + roomname + '"' + ';'
        connection.query(queryString, function(err, roomRows, roomFields){
          if (err) reject(err);

          resolve(userRows, roomRows);
        });
      });
    });     
} 



 
