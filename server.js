const express = require('express');
const path = require('path');
const port = process.env.port || 8080 ;
const app = express();


app.use(express.static(path.resolve(__dirname,'build')));

app.get('*', (req, res)=>{
  res.sendFile(path.resolve('index.html'));


});


app.listen(port);
