var Company = require('./Company');


module.exports = function(app,mongoose,adminAuth){

require('../config/admin-passport');
controller = require('./controller');

app.get('/api/companies', controller.register);


};