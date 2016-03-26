var db = require('../db');

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (data, res) {
      var queryMessage = 'INSERT INTO Messages (message) VALUES (?);';
      db.query(queryMessage, [data.message], function(err, results) {
        if (err) {
          console.log('POST message error: ', err);
        } else { 
          console.log(results);
        }
      });
      var queryUser = 'INSERT INTO Users (username) VALUES (?);';
      db.query(queryUser, [data.username], function(err, results) {
        if (err) {
          console.log('POST users error: ', err);
        } else { 
          console.log(results);
        }
      });
      var queryRoomname = 'INSERT INTO Roomnames (roomname) VALUES (?);';
      db.query(queryRoomname, [data.roomname], function(err, results) {
        if (err) {
          console.log('POST roomname error: ', err);
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
    get: function () {},
    post: function (data, res) {
      var queryString = 'INSERT INTO Users (username) VALUES (?);';
      console.log("--------->");
      db.query(queryString, [data.username], function(err, results) {
        if (err) {
          console.log('POST error: ', err);
        } else {
          console.log(results);
        }
      });
      res.status(201);
      res.end();
    }
  }
};
