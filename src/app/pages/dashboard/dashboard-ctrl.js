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
            $scope.location=[];
      
          }

          $scope.page_size = 7
          $scope.current_page = 1
      $scope.rembemberCurrentPage = function(p) {
        $scope.current_page = p
      }
            
    $scope.openedit = function(data) {
    
      $scope.modaldata=data
      $scope.$modalInstance =  $uibModal.open({
       scope: $scope,
       templateUrl: "/app/pages/dashboard/editDashboardModal.html",
       size: '',
       backdrop: 'static',
       keyboard: false
     })
   };

   $scope.opendetails = function(data, $index) {
    
    $scope.detailsmodaldata=data;
    dashboardService.getEntriesData(JSON.stringify({
      _id: $scope.detailsmodaldata._id,
      empID:Number(localStorage.getItem("username"))
    })).then(
      function(data) { 
        $scope.entries= JSON.parse(data.data.data);
        $scope.rowCollection = JSON.parse(data.data.data);
        $scope.$modalInstance =  $uibModal.open({
          scope: $scope,
          templateUrl: "/app/pages/dashboard/detailsDashboardModal.html",
          size: '',
          backdrop: 'static',
          keyboard: false
        })
      },
      function(msg) {
      });
 };

   $scope.cancel = function() {
    $scope.$modalInstance.dismiss('cancel');
    $state.reload();
};

        


$scope.addNewEntries = function() {
  dashboardService.addEntriesData(JSON.stringify({
    empID:localStorage.getItem("username"),
    
    auditInfo:$scope.modaldata._id,
    generalObservations:$scope.generalObservationsinput,
    recommendations:$scope.recommendationsinput,
    
    targetDate:$scope.targetDateinput,
    currentStatus:$scope.currentStatusinput,
    actionsTaken: $scope.actionsTakeninput,
    complianceStatus:$scope.complianceStatusinput,
    actionTakenBy:$scope.actionTakenByinput,
    remarks:$scope.remarksinput,
   editDate: new Date()
  })).then(function(){
   // toasterService.openSucessToast("Record has been successfully inserted/updated!");
    $state.reload();
  },function(){
    //toasterService.openErrorToast("Record has been successfully inserted/updated!");
  }) 
};

       
    $scope.getauditsDone= function(){
      $scope.location= JSON.parse(localStorage.getItem("location"));
        dashboardService.getauditsDone( $scope.location).then(
          function(data) { 
            $scope.auditsDone= JSON.parse(data.data.data);
            $scope.rowCollection = JSON.parse(data.data.data);
  
         
  
          },
          function(msg) {
          });
      }

           
    }
})();