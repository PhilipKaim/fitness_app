const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const { capitalizeFirstLetter } = require('../utils/utils');

const User = mongoose.model('users');

module.exports = passport => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      let user = await User.findById(id);
      done(null, user);
    } catch(e) {
      console.log(e); 
    }
  });

  passport.use(
    new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:'/auth/google/callback',
      proxy: true
    }, async (accessToken, refreshToken, profile, done) => {

      // const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
      const image = profile.photos[0].value.replace('s50', 's500-c')
      
      const newUser = {
        googleID: profile.id,
        firstName: capitalizeFirstLetter(profile.name.givenName),
        lastName: capitalizeFirstLetter(profile.name.familyName),
        email: profile.emails[0].value,
        image: image,
        token: accessToken
      }
      
      try {
        let user = await User.findOne({ googleID: profile.id });
        
        user ? done(null, user) : new User(newUser).save().then(user => done(null, user));
      } catch (e) {
        console.log(e);
      }
    
    })
  );
}