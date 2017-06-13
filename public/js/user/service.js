angular.module('UserService', []).factory('user', function(adminAuth,$http, $window, $filter) {

  users = function() {

    return $http.get('/api/users', {
      headers: {
        Authorization: 'Bearer ' + adminAuth.getToken()
      }
    });
  };

    deleteuser = function(id) {
    return $http.delete('/api/users/' + id , {
      headers: {
        Authorization: 'Bearer ' + adminAuth.getToken()
      }
    });
  };

  
  return {
    users: users,
    deleteuser : deleteuser

  };


});
// stopped here