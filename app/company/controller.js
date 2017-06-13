var Company = require('./Company');

module.exports.companies =  function (req, res) {

  if (!req.user._id) {
     res.status(401).json({
      "message" : "UnauthorizedError: private data"
    });
  } else {
    // Otherwise continue
    Company
      .find()
      .exec(function(err, companies) {
        res.status(200).json(companies);
      });
  }

};

module.exports.deletecompany = function(req, res) {
 
 
        Company.findByIdAndRemove(req.params.id , function(err){
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