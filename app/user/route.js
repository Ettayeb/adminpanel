var User = require('./User');


module.exports = function(app,mongoose,adminAuth){


controller = require('./controller');

app.post('/api/adminlogin', controller.login);
app.post('/api/admin', controller.register);
app.get('/api/users', adminAuth , controller.users);
app.delete('/api/users/:id', adminAuth , controller.deleteuser);



};