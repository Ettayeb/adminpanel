var Company = require('../company/Company');
var Offer = require('./Offer');

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
module.exports.validate =  function (req, res) {

  if (!req.user._id) {
     res.status(401).json({
      "message" : "UnauthorizedError: private data"
    });
  } else {
    // Otherwise continue
    Offer
      .findById(req.params.id)
      .exec(function(err, offer) {
        
        offer.state = "valide";
        offer.save(function(err){
                if (err)
                   return  res.status(401).json({
                          "message" : "UnauthorizedError: private data"
                 });

               return res.status(200);
        
        });
  });
  }

};


module.exports.deleteoffer = function(req, res) {
 
        Offer.findByIdAndRemove(req.params.id , function(err){
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
