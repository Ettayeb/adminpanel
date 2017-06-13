var Company = require('./Company');

module.exports.offers =  function (req, res) {

  if (!req.user._id) {
     res.status(401).json({
      "message" : "UnauthorizedError: private data"
    });
  } else {
    // Otherwise continue
    Offer
      .find()
      .populate('_company')
      .exec(function(err, offers) {
        res.status(200).json(offers);
      });
  }

};








module.exports.register = function(req, res) {
  var company = new Company();
    console.log("heree register");
   console.log(req.body);
  company.name = req.body.name;
  company.email = req.body.email;

  company.setPassword(req.body.password);
   console.log("setpass done");
  company.save(function(err) {
    var token;    
    token = company.generateJwt();
   console.log("gentoken done");

    res.status(200);
    res.json({
      "token" : token
    });
    console.log("doooone");
  });
};

module.exports.login = function(req, res) {

  passport.authenticate('company-local', function(err, company, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a company is found
    if(company){
      token = company.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If company is not found
      res.status(401).json(info);
    }
  })(req, res);

};

module.exports.validate = function(req, res ) {
        update_offer(req,res,function(err) {
        if(err) {
         res.status(406);
    return res.json({
      "message" : "Vefiry your Data please"
    });

        }
      Offer.findById(req.params.id)
      .exec(function(err, offer) {
        if (err) return res.status(401).json({
      "message" : err
      });
      console.log(offer);
     if (offer.servey === true) {
      offer.title = req.body.title;
      console.log(req.body.nested);
      for(i = 0 ; i < req.body.nested.length ; i++){
        if (offer.nested[i]) {
      offer.nested[i].name = req.body.nested[i].name;
      }
      else {
        offer.nested.push({ name : req.body.nested[i].name });
      }
      }
      offer.ended_at = req.body.ended_at;
        offer.file = req.file && req.file.filename || offer.file;
     }
     else {
  offer.title = req.body.title;
  offer.type = req.body.type;
  offer.category = req.body.category;
  offer.price = req.body.price;
  offer.file = req.file && req.file.filename || offer.file;
  offer.ended_at = req.body.ended_at;
  }
  offer.save(function(err) {
   if (err) {
    res.status(406);
    return res.json({
      "message" : "There is a problem contact the webmaster please"
    });

      
   }
  });

        
         res.status(200);
    return res.json({
      "message" : "Success upload"
    });
        



    });    
  

});

};