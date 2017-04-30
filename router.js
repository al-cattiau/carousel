const Authetication = require('./controllers/authetication');
const passportService = require('./services/passport');
const passport = require('passport');
const express = require('express');
const path = require('path');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) { 
  app.use(express.static(path.resolve(__dirname,'build')));
  app.get('/', requireAuth, (req, res)=>{
    res.send({hi: 'there'});
  });
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve('index.html'));
  });

  app.post('/signin', requireSignin, Authetication.signin);
  app.post('/signup', Authetication.signup);

 }


 

