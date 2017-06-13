angular.module('CompanyService', []).factory('company', function(adminAuth , $http, $window, $filter) {

  companies = function() {
    return $http.get('/api/companies', {
      headers: {
        Authorization: 'Bearer ' + adminAuth.getToken()
      }
    });
  };
  deletecompany = function(id) {
    return $http.delete('/api/companies/' + id, {
      headers: {
        Authorization: 'Bearer ' + adminAuth.getToken()
      }
    });
  };



  return {
    companies: companies,
    deletecompany: deletecompany,
  };


});
// stopped here