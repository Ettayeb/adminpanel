var mongoose = require('mongoose');
var jwt = require('express-jwt');


var adminAuth = jwt({
  secret: 'MY_SECRET',
  adminProperty: 'payload'
});
module.exports = function(app) {
// server routes ===========================================================
// handle things like api calls
// authentication routes
require('./user/route')(app,mongoose,adminAuth);
require('./company/route')(app,mongoose,adminAuth);
require('./offer/route')(app,mongoose,adminAuth);


app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json("u got an error and you know why :/ have fun with that");
  }
});



}