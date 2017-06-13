var Offer = require('./Offer');



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
