const Authetication = require('./controllers/authetication');
const passportService = require('./services/passport');
const passport = require('passport');
const path = require('path');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) { 
  
  app.get('/TagReducer', requireAuth, (req, res)=>{
    res.send(req.user.TagReducer);
  });
  app.post('/TagReducer', requireAuth, (req, res)=>{
    req.user.set('TagReducer', req.body);
    req.user.save()
      .then(()=>
        res.status(201).send('ok')
      )
      .catch(()=>{
        res.status(500).send('err')
      });
    
    
  });
  app.post('/TaskReducer', requireAuth, (req, res)=>{
    req.user.set('TaskReducer', req.body);
    req.user.save()
      .then(()=>
        res.status(201).send('ok')
      )
      .catch(()=>{
        res.status(500).send('err')
      });
  });  
  app.get('/TaskReducer', requireAuth, (req, res)=>{
    res.send(req.user.TaskReducer);
  });
  app.get('/All', requireAuth, (req, res)=>{
    const rehydrate = {
      'TagReducer': req.user.TagReducer,
      'TaskReducer': req.user.TaskReducer,
    }
    res.send(JSON.stringify(rehydrate));
  });

  

  app.post('/signin', requireSignin, Authetication.signin);
  app.post('/signup', Authetication.signup);
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../build','index.html'));
  })
  

 }