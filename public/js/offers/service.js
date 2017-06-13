angular.module('OffersService', []).factory('offer', function (adminAuth ,$http, $window, $filter) {
    
    offers = function() {
      return $http.get('/api/offers', {
      headers: {
        Authorization: 'Bearer ' + adminAuth.getToken()
      }
    }) ;
    };


  deleteoffer = function(id) {
    return $http.delete('/api/offers/' + id, {
      headers: {
        Authorization: 'Bearer ' + adminAuth.getToken()
      }
    });
  };
  validateoffer = function(id) {
    return $http.get('/api/offers/' + id, {
      headers: {
        Authorization: 'Bearer ' + adminAuth.getToken()
      }
    });
  };



    
    return {
      offers : offers,
      deleteoffer : deleteoffer,
      validateoffer : validateoffer

      };
 

});
// stopped here

