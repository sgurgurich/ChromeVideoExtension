var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/CVEServiceModel'), //created model loading here
  bodyParser = require('body-parser');
  

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CVEdb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/CVEServiceRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('Chrome Video Extension Service RESTful API server started on: ' + port);

