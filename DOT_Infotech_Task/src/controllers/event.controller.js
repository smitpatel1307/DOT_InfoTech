"use strict";
const User = require("../models/user.model");
exports.changeConsents = function (req, res) {
  let userToBeUpdated;
  if (!req.body.user.id || !req.body.consents) {
    return res.status(400).send({ error: true, message: "Bad Request" });
  }
  User.findById(req.body.user.id, function (err, user) {
    if (err) {
      return res
        .status(400)
        .send({ error: true, message: "Error in find user by Id" });
    } else {
      delete user.id;
      userToBeUpdated = user;
      const allConsents = user.consents.length > 0 ? [...user.consents] : [];
      let lastConsent = user.consents.length ? user.consents.pop() : null;
      if (lastConsent) {
        if (
          lastConsent.id !== req.body.consents.id ||
          lastConsent.enabled !== req.body.consents.enabled
        ) {
          allConsents.push(req.body.consents);
        }
      } else {
        allConsents.push(req.body.consents);
      }

      userToBeUpdated.consents = JSON.stringify(allConsents);
      User.update(req.body.user.id, userToBeUpdated, function (err, result) {
        if (err) {
          return res.status(400).send({
            error: true,
            message: "Error in Event",
            err: err,
          });
        } else {
          return res.status(200).json(result);
        }
      });
    }
  });
};
