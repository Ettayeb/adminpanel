angular.module('CompanyCtrl', ["CompanyService"])
controller('CompaniesController', function(company, $route) {
  var vm = this;
  vm.alerts = [];
  company.companies().then(function onSuccess(response) {
    vm.companies = response.data;
    console.log(vm.companies);
    vm.currentPage = 1; // keeps track of the current page
    vm.pageSize = 2; // holds the number of items per page
  }, function onError(response) {
    vm.error = response.data.message;
  });
  company.getserveys().then(function onSuccess(response) {
    vm.serveys = response.data;
    console.log(vm.serveys);
    vm.currentPageS = 1; // keeps track of the current page
    vm.pageSizeS = 2; // holds the number of items per page
  }, function onError(response) {
    vm.error = response.data.message;
  });
  vm.remove = function(id) {
    company.deleteoffer(id).then(function(resp) {
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
});