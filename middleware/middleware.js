const express = require('express');
const app = express();

module.exports = {
  logout: (req, res, next) => {
    req.logout();
    next();
  },
  successRedirect: (req, res) => {
    let token = req.user.token;
    destination = `/form?token=${token}`;
    res.redirect(destination);
  }
};