CREATE DATABASE chat;

USE chat;

-- CREATE TABLE Messages (
--   id INT(11) NOT NULL AUTO_INCREMENT,
--   message VARCHAR(100),
--   username VARCHAR(20),
--   roomname VARCHAR(20),
--   PRIMARY KEY (id)
-- );

CREATE TABLE Users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(20) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Roomnames (
  id INT(11) NOT NULL AUTO_INCREMENT,
  roomname VARCHAR(20) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Messages (
  id INT(11) NOT NULL AUTO_INCREMENT,
  message VARCHAR(100),
  id_Users INT(11),
  id_Roomnames INT(11),
  PRIMARY KEY (id),
  FOREIGN KEY (id_Users)
    REFERENCES Users(id),
  FOREIGN KEY (id_Roomnames)
    REFERENCES Roomnames(id)
);




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

