var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public/build')));
app.use(session({secret: 'codingdojorocks'}));

require('./server/config/mongoose.js');

var routes_setter = require('./server/config/routes.js');
routes_setter(app);
app.all('*', (req,res,next) => {
  res.sendfile(path.resolve('./public/build/index.html'));
});

app.listen(8000, function() {
  console.log('listening on port 8000');
});
