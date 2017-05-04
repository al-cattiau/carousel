const Authetication = require('./controllers/authetication');
const passportService = require('./services/passport');
const passport = require('passport');
const express = require('express');
const path = require('path');
const jsonfile = require('jsonfile')
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const HttpStatus = require('http-status-codes');
const Datastore = require('nedb');
const db = new Datastore({filename:path.resolve(__dirname,'reduxData')});

module.exports = function (app) { 
  app.use(express.static(__dirname + '/build'));
  app.get('/', requireAuth, (req, res)=>{
    res.send({hi: 'there'});
  });
  app.put('/save', (req, res)=>{
    db.load
    res.status(HttpStatus.OK);
  });
  app.get('/load', (req, res)=>{

  });
  app.post('/signin', requireSignin, Authetication.signin);
  app.post('/signup', Authetication.signup);

  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname,'build','index.html'));
  });

  

 }


 

