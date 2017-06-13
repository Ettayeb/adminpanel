var User = require('./User');


module.exports = function(app,mongoose,adminAuth){

require('../config/user-passport');
controller = require('./controller');

app.post('/api/userlogin', controller.login);
app.post('/api/user', controller.register);
app.post('/api/apply' , controller.apply);
app.get('/api/applies/:id' , controller.getapplies);
app.get('/api/applied/:id' , controller.applied);
app.get('/api/privateuserapplies',adminAuth, controller.privateuserapplies);
app.post('/api/user/profile',adminAuth, controller.profileupdate);
app.get('/api/user/profile/:id',adminAuth, controller.profile);
app.get('/api/vote/:id' , controller.vote);







      app.get('/api/users', adminAuth, controller.profileRead);
        app.get('/api/users', function(req, res) {

            User.find(function(err, users) {

                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(users); 
            });
        });

        };