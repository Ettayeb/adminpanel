var passport = require('passport');
var User = require('./User');

require('../config/admin-passport')(passport,User);

module.exports.register = function(req, res) {
  var user = new User();
   console.log(req.body);
  user.name = req.body.name;
  user.email = req.body.email;
  user.type = 'admin';

  user.setPassword(req.body.password);
   console.log("setpass done");
  user.save(function(err) { 
   if (err){
   res.status(406);
    res.json({
      "message" : "Email already exist"
    });
   return; 
      
      
   }
    var token;
    
    token = user.generateJwt();
   console.log("gentoken done");

    res.status(200);
    res.json({
      "token" : token
    });
    console.log("doooone");
  });
};

module.exports.login = function(req, res) {

  passport.authenticate('admin-local', function(err, user, info){
    var token;
    if (err) {
      console.log(err);
      return res.status(401).json(err);
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      return res.status(200).json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};

module.exports.users =  function (req, res) {

  if (!req.user._id) {
     res.status(401).json({
      "message" : "UnauthorizedError: private data"
    });
  } else {
    // Otherwise continue
    User
      .find()
      .exec(function(err, users) {
        res.status(200).json(users);
      });
  }

};

module.exports.deleteuser = function(req, res) {
 
 
        User.findByIdAndRemove(req.params.id , function(err){
          if(err) {
         res.status(406);
    return res.json({
      "message" : "Error"
    });

        }
         res.status(200);
    return res.json({
      "message" : "Success"
    });
        



    });    
  

};