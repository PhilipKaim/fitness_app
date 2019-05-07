const passport = require('passport');
const express = require('express')
const router = express.Router()

const middleware = require('../middleware/middleware');

router.get('/google',
  middleware.logout,
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  middleware.successRedirect);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router