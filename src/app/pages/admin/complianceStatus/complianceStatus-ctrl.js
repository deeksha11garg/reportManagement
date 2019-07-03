/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.admin.complianceStatus', ['ngAnimate', 'ngSanitize', 'ui.bootstrap','smart-table'])
    .config(routeConfig)
    .controller('complianceStatus-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.admin.complianceStatus', {
        url: '/complianceStatus',
        templateUrl: 'app/pages/admin/complianceStatus/complianceStatus.html',
        title: 'Compliance Status',
        controller: 'complianceStatus-ctrl',
        sidebarMeta: {
          icon: 'ion-android-send',
          order: 0,
        },
        authenticate: true
      });
  }

 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter,$state , editableOptions, editableThemes, complianceStatusService, $uibModal, $log, _, toasterService) {
   
    $scope.init=function(){
      $scope.complianceStatus = {};
      $scope.rowCollection=[];
      $scope.getComplianceStatus();

    }

    
    $scope.page_size = 7
    $scope.current_page = 1
$scope.rembemberCurrentPage = function(p) {
  $scope.current_page = p
}

    $scope.addNewRecord = function(){
      $scope.complianceStatus.complianceStatusData.push({
        complianceStatus:""
      });
      $scope.rowCollection.push({
        complianceStatus:""
      });
    }

    $scope.getComplianceStatus= function(){
     
      complianceStatusService.getComplianceStatusData(JSON.stringify({
        name : "complianceStatus"
      })).then(
        function(data) { 
          $scope.complianceStatus.complianceStatusData = JSON.parse(data.data.data)[0].data;
          $scope.rowCollection = JSON.parse(data.data.data)[0].data;
          $scope.complianceStatus.complianceStatusID = JSON.parse(data.data.data)[0]._id;
          $scope.complianceStatus.complianceStatusName = JSON.parse(data.data.data)[0].name;
        },
        function(msg) {
        });
    }

    $scope.editComplianceStatusData = function(data, index,counter){
      if(counter==0){
        data.complianceStatus = data.complianceStatus.toUpperCase(); 
        $scope.rowCollection[index]=data;
      }
      else
      $scope.rowCollection.splice(index, 1);
      complianceStatusService.editComplianceStatusData(JSON.stringify({
          _id: $scope.complianceStatus.complianceStatusID,
          name: $scope.complianceStatus.complianceStatusName,
          data: $scope.rowCollection,
        })).then(function(){
         // toasterService.openSucessToast("Record has been successfully inserted/updated!");
          $state.reload();
        },function(){
          //toasterService.openErrorToast("Record has been successfully inserted/updated!");
        })      
    }
 
    

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
  




  }
})();
