angular.module('AdminCtrl', ["AdminService"])
.controller('LogController', function(adminAuth, $location) {

  var vm = this;
  vm.submit = function() {
    user = this.formData;
    adminAuth.login(user).then(function onSuccess(success) {
      adminAuth.saveToken(success.data.token);
      $location.path('/');
    }, function onError(error) {
      // debug
      vm.error = error.data.message;
      console.log(error.data.message);

    }
  );
  };
}).controller('NavController', function($scope, adminAuth, $location) {
var vm = this;

vm.logout = function (){
  adminAuth.logout();
  $location.path('/login');
};
})
.controller('RegController', function(adminAuth, $location) {
  var vm = this;
  vm.formData = {};
  vm.submit = function() {
    var user = this.formData;
      user.type = 'admin';
    console.log(user.email);
    if (user.password != user.password_verif) {
      vm.error = "Verify your password bro !";
      console.log(this.error);

    } else if (user.password.length < 6) {
      vm.error = "Password must be more than 6 caracters";
      console.log(this.error);

    } else {
      // call the auth.. factory then it will do the job
      adminAuth.register(user).then(function onSuccess(response) {
        console.log(response.data.token);
        adminAuth.saveToken(response.data.token);
        $location.path("/");
      }, function onError(response) {
        vm.error = response.data.message;
        console.log(response.data.message);
      });
    }
  };
});