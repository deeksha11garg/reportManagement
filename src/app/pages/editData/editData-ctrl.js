/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.editData', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'smart-table'])
  .config(routeConfig)
    .controller('editData-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.editData', {
        url: '/editData',
        templateUrl: 'app/pages/editData/editData.html',
        title: 'Edit Data',
        controller: 'editData-ctrl',
        sidebarMeta: {
          icon: 'ion-ios-compose-outline',
          order: 0,
        },
        authenticate: true
      });
  }
  
  function TablesPageCtrl($scope,$rootScope, $http, $filter,$state , editableOptions, editableThemes,editDataService, $uibModal, $log, _, toasterService) {
   
                                        $scope.init=function(){
                                              
                                          $scope.rowCollection=[];
                                        
                                          $scope.getauditsDone();
                                         

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
                                    editDataService.getEntriesData(JSON.stringify({
                                      _id: $scope.detailsmodaldata._id
                                      
                                    })).then(
                                      function(data) { 
                                        $scope.entries= JSON.parse(data.data.data);
                                        $scope.rowCollection = JSON.parse(data.data.data);
                                        $scope.$modalInstance =  $uibModal.open({
                                          scope: $scope,
                                          templateUrl: "/app/pages/editData/editDataModal.html",
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

                                      editDataService.getEntriesData().then(
                                      function(data) { 
                                        $scope.entries= JSON.parse(data.data.data);
                                        $scope.rowCollection = JSON.parse(data.data.data);


                                      },
                                      function(msg) {
                                      });
                                    }
                                      
                                    $scope.getauditsDone= function(){
                                   
                                    editDataService.getauditsDone().then(
                                        function(data) { 
                                          $scope.auditsDone= JSON.parse(data.data.data);
                                          $scope.rowCollection = JSON.parse(data.data.data);

                                      

                                        },
                                        function(msg) {
                                        });
                                    }







  }
})();
