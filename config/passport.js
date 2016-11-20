'use strict';
var passport = require('passport');
var _ = require('lodash');
var LocalStrategy = require('passport-local').Strategy;
var FacebookTokenStrategy = require('passport-facebook-token');
var config = require('./config');
var db = require('./sequelize');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    db.User.find({where: {id: id}}).then(function(user){
        if(!user){

            return done(null, false);
        }
        done(null, user);
    }).catch(function(err){
        done(err, null);
    });
});

//Use local strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    db.User.find({ where: { email: email }}).then(function(user) {
      if (!user) {
        done(null, false, { message: 'Unknown user' });
      } else if (!user.authenticate(password)) {
        done(null, false, { message: 'Invalid password'});
      } else {
        done(null, user);
      }
    }).catch(function(err){
      done(err);
    });
  }
));

passport.use(new FacebookTokenStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        profileFields: ['id', 'first_name', 'last_name', 'email', 'photos']
    }, function (accessToken, refreshToken, profile, done) {

        db.User.find({where : {email: profile.emails[0].value}}).then(function(user){
            if(!user){
                db.User.create({
                    name: profile.name.givenName || '',
                    email: profile.emails[0].value,
                    username: profile.name.givenName || '',
                    provider: 'facebook',
                    facebookUserId: profile.id
                }).then(function(u){
                    done(null, u);
                })
            } else {
                done(null, user);
            }
        }).catch(function(err){
            done(err, null);
        });

    }

));

module.exports = passport;

