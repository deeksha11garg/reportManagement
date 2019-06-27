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
         

        
       
        
    $scope.getauditsDone= function(){
     
        dashboardService.getauditsDone().then(
          function(data) { 
            $scope.auditsDone= JSON.parse(data.data.data);
            $scope.rowCollection = JSON.parse(data.data.data);
  
         
  
          },
          function(msg) {
          });
      }

           
    }
})();