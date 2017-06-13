angular.module('OffersCtrl', ["OffersService"])
.controller('OffersController', function(offer, $window , $location , $route) {

  var vm = this;
  vm.alerts = [];
  offer.offers().then(function onSuccess(response) {
    vm.offers = response.data;
    console.log(vm.offers);
    vm.currentPage = 1; // keeps track of the current page
    vm.pageSize = 6; // holds the number of items per page
  }, function onError(response) {
    vm.error = response.data.message;
  });
  vm.remove = function(id) {
    offer.deleteoffer(id).then(function(resp) {
      vm.alerts.push({
        type: "success",
        msg: "Votre offre a été supprimé avec succés"
      });
      $route.reload();
    }, function(resp) {
      vm.alerts.push({
        type: "danger",
        msg: "There is a problem loading your data.. Please contact the webmaster"
      });
    });
  };
  
  vm.validate = function(id) {
    offer.validateoffer(id).then(function(resp) {
      vm.alerts.push({
        type: "success",
        msg: "Votre offre a été validé avec succés"
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