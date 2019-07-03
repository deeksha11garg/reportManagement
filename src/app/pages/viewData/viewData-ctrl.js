/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.viewData', ['ngAnimate', 'ngSanitize', 'ui.bootstrap','smart-table'])
    .config(routeConfig)
    .controller('viewData-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.viewData', {
        url: '/viewData',
        templateUrl: 'app/pages/viewData/viewData.html',
        title: 'View Data',
        controller: 'viewData-ctrl',
        sidebarMeta: {
          icon: 'ion-ios-list-outline',
          order: 0,
        },
        authenticate: true
      });
  }

 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter,$state , editableOptions, editableThemes, viewDataService, $uibModal, $log, _, toasterService) {
   
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
                      
                // $scope.openedit = function(data) {

                // $scope.modaldata=data
                // $scope.$modalInstance =  $uibModal.open({
                // scope: $scope,
                // templateUrl: "/app/pages/dashboard/editDashboardModal.html",
                // size: '',
                // })
                // };
                $scope.opendetails = function(data, $index) {
                $scope.detailsmodaldata=data;
                viewDataService.getEntriesData(JSON.stringify({
                  _id: $scope.detailsmodaldata._id
                  
                })).then(
                  function(data) { 
                    $scope.entries= JSON.parse(data.data.data);
                    $scope.rowCollection = JSON.parse(data.data.data);
                    $scope.$modalInstance =  $uibModal.open({
                      scope: $scope,
                      templateUrl: "/app/pages/viewData/viewDataModal.html",
                      size: '',
                    })
                  },
                  function(msg) {
                  });
             };

                $scope.cancel = function() {
                $scope.$modalInstance.dismiss('cancel');
                $state.reload();
                };

                  


                // $scope.addNewEntries = function() {
                // dashboardService.addEntriesData(JSON.stringify({
                // empID:localStorage.getItem("username"),

                // auditInfo:$scope.modaldata._id,
                // generalObservations:$scope.generalObservationsinput,
                // recommendations:$scope.recommendationsinput,

                // targetDate:$scope.targetDateinput,
                // currentStatus:$scope.currentStatusinput,
                // actionsTaken: $scope.actionsTakeninput,
                // complianceStatus:$scope.complianceStatusinput,
                // actionTakenBy:$scope.actionTakenByinput,
                // remarks:$scope.remarksinput,
                // editDate: new Date()
                // })).then(function(){
                // // toasterService.openSucessToast("Record has been successfully inserted/updated!");
                // $state.reload();
                // },function(){
                // //toasterService.openErrorToast("Record has been successfully inserted/updated!");
                // }) 
                // };

                

                $scope.getEntries= function(){

                  viewDataService.getEntriesData().then(
                  function(data) { 
                    $scope.entries= JSON.parse(data.data.data);
                    $scope.rowCollection = JSON.parse(data.data.data);


                  },
                  function(msg) {
                  });
                }
                  
                $scope.getauditsDone= function(){
                $scope.stationIncharge= JSON.parse(localStorage.getItem("stationIncharge"));
                viewDataService.getauditsDone( $scope.stationIncharge).then(
                    function(data) { 
                      $scope.auditsDone= JSON.parse(data.data.data);
                      $scope.rowCollection = JSON.parse(data.data.data);

                  

                    },
                    function(msg) {
                    });
                }





  }
})();
