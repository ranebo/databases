var db = require('../db');

module.exports = {
  messages: {
    get: function (res) {
      var messages;
      var queryMessages = 'SELECT * FROM Messages;';
      db.query(queryMessages, [], function(err, results) {
        if (err) {
          console.log('GET Messages error: ', err);
        } else {
          messages = results;
          console.log('-------------->', messages);
        }
      });
      res.status(200);
      res.send(JSON.stringify(messages));
    }, // a function which produces all the messages

    post: function (data, res) {
      var queryUser = 'INSERT IGNORE INTO Users (username) VALUES (?);';
      db.query(queryUser, [data.username], function(err, results) {
        if (err) {
          console.log('POST users error: ', err);
        } else { 
          console.log(results);
        }
      });
      var queryRoomname = 'INSERT IGNORE INTO Roomnames (roomname) VALUES (?);';
      db.query(queryRoomname, [data.roomname], function(err, results) {
        if (err) {
          console.log('POST roomname error: ', err);
        } else { 
          console.log(results);
        }
      });
      var queryMessage = 'INSERT INTO Messages (message, id_Users, id_Roomnames) VALUES (?, (SELECT id FROM Users WHERE username=?), (SELECT id FROM Roomnames WHERE roomname=?));';
      db.query(queryMessage, [data.message, data.username, data.roomname], function(err, results) {
        if (err) {
          console.log('POST message error: ', err);
        } else { 
          console.log(results);
        }
      });

      res.status(201);
      res.end();
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (res) {
      var users;
      var queryUsers = 'SELECT users FROM Users;';
      db.query(queryUsers, [], function(err, results) {
        if (err) {
          console.log('GET Users error: ', err);
        } else {
          users = results;
        }
      });
      console.log('-------------->', users);
      res.status(200);
      res.send(JSON.stringify(users));
    },

    post: function (data, res) {
      var queryString = 'INSERT INTO Users (username) VALUES (?);';
      db.query(queryString, [data.username], function(err, results) {
        if (err) {
          console.log('POST Users error: ', err);
        } else {
          console.log(results);
        }
      });
      res.status(201);
      res.end();
    }
  }
};
