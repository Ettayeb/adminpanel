angular.module('UserCtrl', ["UserService"])
.controller('UsersController', function(user , $route) {
  var vm = this;
  vm.alerts = [];
  user.users().then(function onSuccess(response) {
    vm.users = response.data;
    console.log(vm.users);
    vm.currentPage = 1; // keeps track of the current page
    vm.pageSize = 6; // holds the number of items per page
  }, function onError(response) {
    vm.error = response.data.message;
  });
  vm.remove = function(id) {
    user.deleteuser(id).then(function(resp) {
      vm.alerts.push({
        type: "success",
        msg: "Candidate removed"
      });
      $route.reload();
    }, function(resp) {
      vm.alerts.push({
        type: "danger",
        msg: "There is a problem loading your data.. Please contact the webmaster"
      });
    });


  };


});