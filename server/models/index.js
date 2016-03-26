var db = require('../db');

module.exports = {
  messages: {
    get: function (res) {
      var messages;
      var queryMessages = 'SELECT message, username, roomname FROM Messages T1 INNER JOIN Users T2 ON T1.id_Users = T2.id INNER JOIN Roomnames T3 ON T1.id_Roomnames = T3.id;';
      db.query(queryMessages, [], function(err, results) {
        if (err) {
          console.log('GET Messages error: ', err);
          res.status(400);
          res.end();
        } else {
          messages = results;
          res.status(200);
          res.send(JSON.stringify(messages));
        }
      });
    }, // a function which produces all the messages

    post: function (data, res) {
      var queryUser = 'INSERT IGNORE INTO Users (username) VALUES (?);';
      db.query(queryUser, [data.username], function(err, results) {
        if (err) {
          console.log('POST users error: ', err);
          res.status(401);
          res.end();
        } else { 
          console.log(results);
        }
      });
      var queryRoomname = 'INSERT IGNORE INTO Roomnames (roomname) VALUES (?);';
      db.query(queryRoomname, [data.roomname], function(err, results) {
        if (err) {
          console.log('POST roomname error: ', err);
          res.status(401);
          res.end();
        } else { 
          console.log(results);
        }
      });
      var queryMessage = 'INSERT INTO Messages (message, id_Users, id_Roomnames) VALUES (?, (SELECT id FROM Users WHERE username=?), (SELECT id FROM Roomnames WHERE roomname=?));';
      db.query(queryMessage, [data.message, data.username, data.roomname], function(err, results) {
        if (err) {
          console.log('POST message error: ', err);
          res.status(401);
          res.end();
        } else { 
          console.log(results);
          res.status(201);
          res.end();
        }
      });

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
          res.status(400);
          res.end();
        } else {
          users = results;
          res.status(200);
          res.send(JSON.stringify(users));
        }
      });
    },

    post: function (data, res) {
      var queryString = 'INSERT IGNORE INTO Users (username) VALUES (?);';
      db.query(queryString, [data.username], function(err, results) {
        if (err) {
          console.log('POST Users error: ', err);
          res.status(401);
          res.end();
        } else {
          console.log(results);
          res.status(201);
          res.end();
        }
      });
    }
  }
};
