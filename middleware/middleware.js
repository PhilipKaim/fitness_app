const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Users = mongoose.model('users');

module.exports = {
  logout: (req, res, next) => {
    req.logout();
    next();
  },
  successRedirect: async (req, res) => {
    let token = req.user.token;
    let user = await Users.find({token})
    
    if (user[0].weight && user[0].goal) {
      destination = `/home?token=${token}`;
      res.redirect(destination);
    } else {
      destination = `/form?token=${token}`;
      res.redirect(destination);
    }
  }
};