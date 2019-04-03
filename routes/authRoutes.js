const passport = require('passport');
// const _ = require('lodash');

const middleware = require('../middleware/middleware');

module.exports = app => {
  app.get('/auth/google',
    middleware.logout,
    passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    middleware.successRedirect);
  
  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
}