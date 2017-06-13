var Company = require('./Company');


module.exports = function(app,mongoose,adminAuth){

require('../config/admin-passport');
controller = require('./controller');

app.get('/api/companies', adminAuth , controller.companies);
app.delete('/api/companies/:id', adminAuth , controller.deletecompany);


};