/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.main')
    .controller('main-ctrl', MainCntrl)
 
  /** @ngInject */
  function MainCntrl($scope,$rootScope, toasterService){
    // toasterService.openInfoToast("Welcome User : " + localStorage.getItem('username'));
  //   $scope.customDate = new Date();
  //   $scope.nextDate =  new Date(angular.copy($scope.customDate).setDate($scope.customDate.getDate() + 1));
   }

})();
