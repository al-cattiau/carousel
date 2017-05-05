const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json({type:'*/*'}));

app.use(express.static(path.resolve(__dirname, 'build')));

app.get('*', (req, res)=>{
  res.sendFile(path.resolve(__dirname,'build','index.html'));
})

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on:', port);