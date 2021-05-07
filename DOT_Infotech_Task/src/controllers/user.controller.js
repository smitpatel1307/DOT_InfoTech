"use strict";
const User = require("../models/user.model");
exports.findAll = function (req, res) {
  User.findAll(function (err, users) {
    if (err) return res.send(err);
    else return res.send(users);
  });
};
exports.create = function (req, res) {
  const new_user = new User(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    User.create(new_user, function (err, user) {
      if (err)
        return res.status(422).json({ code: err.code, error: err.sqlMessage });
      else
        return res.json({
          code: "OK",
          message: "User added successfully!",
          data: user,
        });
    });
  }
};
exports.findById = function (req, res) {
  if (!req.params.id) {
    return res.status(400).send({ error: true, message: "Bad Request" });
  }
  User.findById(req.params.id, function (err, user) {
    if (err)
      return res
        .status(400)
        .send({ error: true, message: "Error in find user by Id" });
    else return res.json(user);
  });
};
exports.delete = function (req, res) {
  if (!req.params.id) {
    return res.status(400).send({ error: true, message: "Bad Request" });
  }
  User.delete(req.params.id, function (err, userDeleted) {
    if (err) return res.send(err);
    // userDeleted[0].consents = JSON.parse(userDeleted[0].consents);
    else
      return res.json({
        error: false,
        message: "User successfully deleted",
        data: userDeleted,
      });
  });
};
