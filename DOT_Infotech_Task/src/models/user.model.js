"use strict";
var dbConn = require("./../../config/db.config");
//Employee object create
var User = function (user) {
  this.email = user.email;
};
User.create = function (newUser, result) {
  dbConn.query("INSERT INTO user set ?", newUser, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      dbConn.query(
        "Select * from user where id = ? ",
        res.insertId,
        function (err, res) {
          if (err) {
            console.log("error: ", err);
            result(err, null);
          } else {
            res[0].consents = JSON.parse(res[0].consents);
            result(null, res[0]);
          }
        }
      );
      //result(null, res);
    }
  });
};
User.findById = function (id, result) {
  dbConn.query("Select * from user where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      res[0].consents = JSON.parse(res[0].consents);
      result(null, res[0]);
    }
  });
};
User.findAll = function (result) {
  dbConn.query("Select * from user", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
User.update = function (id, user, result) {
  dbConn.query(
    "UPDATE user SET email=?, consents=? WHERE id = ?",
    [user.email, user.consents, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        dbConn.query(
          "Select * from user where id = ? ",
          id,
          function (err, res) {
            if (err) {
              console.log("error: ", err);
              result(err, null);
            } else {
              res[0].consents = JSON.parse(res[0].consents);
              result(null, res[0]);
            }
          }
        );
        // result(null, res);
      }
    }
  );
};
User.delete = function (id, result) {
  let aboutToDeleteUser = null;
  dbConn.query("Select * from user where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      res[0].consents = JSON.parse(res[0].consents);
      aboutToDeleteUser = res[0];
    }
  });
  dbConn.query("DELETE FROM user WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, aboutToDeleteUser);
    }
  });
};
module.exports = User;
