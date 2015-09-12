CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  UserId int NOT NULL AUTO_INCREMENT,
  Username varchar(15),
  PRIMARY KEY(UserId)
  
);

CREATE TABLE rooms (
  RoomId int NOT NULL AUTO_INCREMENT,
  RoomName varchar(12), 
  PRIMARY KEY(RoomId)
  
);


CREATE TABLE messages (
  MessageId int NOT NULL AUTO_INCREMENT,
  RoomId int, 
  UserId int,
  MessageText varChar(120),
  PRIMARY KEY(MessageId),
  FOREIGN KEY ( RoomId ) REFERENCES rooms( RoomId ),
  FOREIGN KEY ( UserId ) REFERENCES users( UserId )

);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

