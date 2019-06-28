/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
    'use strict';
    angular.module('BlurAdmin.pages.dashboard')
        .controller('dashboard-ctrl', dashboardCtrl)


    /** @ngInject */
    function dashboardCtrl($scope,$rootScope, $http, $filter,$state , editableOptions, editableThemes, dashboardService, $uibModal, $log, _, toasterService) {

        $scope.init=function(){
           
            $scope.rowCollection=[];
           
            $scope.getauditsDone();
      
          }
            
    $scope.openedit = function(data) {
    
      $scope.modaldata=data
      $scope.$modalInstance =  $uibModal.open({
       scope: $scope,
       templateUrl: "/app/pages/dashboard/editDashboardModal.html",
       size: '',
     })
   };

   $scope.opendetails = function(data, $index) {
    
    $scope.detailsmodaldata=data;
    dashboardService.getEntriesData(JSON.stringify({
      _id: $scope.detailsmodaldata._id
    })).then(
      function(data) { 
        $scope.entries= JSON.parse(data.data.data);
        $scope.rowCollection = JSON.parse(data.data.data);
        $scope.$modalInstance =  $uibModal.open({
          scope: $scope,
          templateUrl: "/app/pages/dashboard/detailsDashboardModal.html",
          size: '',
        })
      },
      function(msg) {
      });
 };

   $scope.cancel = function() {
    $scope.$modalInstance.dismiss('cancel');
};

        
       
      
    $scope.getEntries= function(){
     
      dashboardService.getEntriesData().then(
        function(data) { 
          $scope.entries= JSON.parse(data.data.data);
          $scope.rowCollection = JSON.parse(data.data.data);


        },
        function(msg) {
        });
    }
        
    $scope.getauditsDone= function(){
      $scope.stationIncharhge= JSON.parse(localStorage.getItem("location"));
        dashboardService.getauditsDone( $scope.stationIncharhge).then(
          function(data) { 
            $scope.auditsDone= JSON.parse(data.data.data);
            $scope.rowCollection = JSON.parse(data.data.data);
  
         
  
          },
          function(msg) {
          });
      }

           
    }
})();