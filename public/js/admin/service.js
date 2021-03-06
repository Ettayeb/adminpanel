angular.module('AdminService', []).factory('adminAuth', function($http, $window, $filter) {

  var saveToken = function(token) {
        console.log(token);

        console.log("savedd");    
    $window.localStorage.setItem('admin-token',token);

  };

  var getToken = function() {
    //debug
    //  console.log(' token = '+ $window.localStorage['mean-token']); // working like the sharm :D
    return $window.localStorage.getItem('admin-token');
  };
  var isLoggedIn = function() {
    var token = getToken();
    var payload;

    if (token) {
      payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);
      console.log(payload);
      //debug
      // console.log($filter('date')(payload.exp * 1000, "dd/MM/yyyy") + " ,,, " + $filter('date')(Date.now()  , 'dd/MM/yyyy')); // working like the fucking sharm ! :S
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };
  currentUser = function() {
    if (isLoggedIn()) {
      var token = getToken();
      var payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);
      return {
        id: payload._id,
        email: payload.email,
        name: payload.name
      };
    }
  };

  logout = function() {
    $window.localStorage.removeItem('admin-token');
  };
  register = function(user) {
    return $http.post('/api/admin', user);
  };

  login = function(user) {
    return $http.post('/api/adminlogin', user);

  };
  
  return {
    currentUser: currentUser,
    saveToken: saveToken,
    getToken: getToken,
    isLoggedIn: isLoggedIn,
    logout: logout,
    register: register,
    login: login,

  };


});
// stopped here