// user strategy

module.exports = function(passport , User){

var LocalStrategy = require('passport-local').Strategy;

passport.use('admin-local' , new LocalStrategy({
    usernameField: 'email'
  },
  function(email, password, done) {
    User.findOne({ email: email , type : 'admin' }, function (err, company) {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!company) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      if (!company.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, company);
    });
  }
));
}