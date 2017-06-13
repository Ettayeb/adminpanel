module.exports = function(app,mongoose,adminAuth){

require('../config/admin-passport');
controller = require('./controller');


app.get('/api/offers', adminAuth , controller.offers);
app.get('/api/offers/:id', adminAuth , controller.validate);
app.delete('/api/offers/:id',adminAuth, controller.deleteoffer);

};