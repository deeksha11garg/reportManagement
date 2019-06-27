/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.auditsDone', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'smart-table'])
    .config(routeConfig)
    .controller('auditsDone-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.auditsDone', {
        url: '/auditsDone',
        templateUrl: 'app/pages/auditsDone/auditsDone.html',
        title: 'Audits Done',
        controller: 'auditsDone-ctrl',
        sidebarMeta: {
          icon: 'ion-android-done',
          order: 0,
        },
        authenticate: true
      });
  }

 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter,$state , editableOptions, editableThemes, auditsDoneService, $uibModal, $log, _, toasterService) {
    $scope.init=function(){
      $scope.auditsDone = {};
      $scope.insert=false;
      $scope.station=[];
      $scope.subStation=[];
      $scope.year=[];
      $scope.auditType=[];
      $scope.rowCollection=[];
     
      $scope.getauditsDone();

    }
   
   
   
   

    
    $scope.open = function(data) {
    

         $scope.$modalInstance =  $uibModal.open({
          scope: $scope,
          templateUrl: "/app/pages/auditsDone/editAuditsDoneModal.html",
          size: '',
        })
      };

      $scope.addNewAuditsDone = function() {
        auditsDoneService.addAuditsDoneData(JSON.stringify({
          empID:localStorage.getItem("username"),
          auditType:$scope.auditTypeSelected.auditType,
          year:$scope.yearSelected.year,
          station:$scope.stationSelected.station,
          subStation:$scope.subStationSelected.subStation,
          from:$scope.fromSelected,
          to: $scope.toSelected,
         enteredDate: new Date()
        })).then(function(){
         // toasterService.openSucessToast("Record has been successfully inserted/updated!");
          $state.reload();
        },function(){
          //toasterService.openErrorToast("Record has been successfully inserted/updated!");
        }) 
    };
    
    $scope.cancel = function() {
        $scope.$modalInstance.dismiss('cancel');
    };
    


    $scope.getauditsDone= function(){
     $scope.stationIncharhge= JSON.parse(localStorage.getItem("stationIncharge"));
      auditsDoneService.getauditsDone($scope.stationIncharhge).then(
        function(data) { 
          $scope.auditsDone= JSON.parse(data.data.data);
          $scope.rowCollection = JSON.parse(data.data.data);

       

        
        auditsDoneService.getMiscellaneousData(JSON.stringify({
          name : "station"
        })).then(
          function(data) { 
            $scope.station = JSON.parse(data.data.data)[0].data;
          },
          function(msg) {
          });

          auditsDoneService.getMiscellaneousData(JSON.stringify({
            name : "subStation"
          })).then(
            function(data) { 
              $scope.subStation = JSON.parse(data.data.data)[0].data;
            },
            function(msg) {
            });
          for(var i=0;i<=$scope.subStation.length;i++)
            {
             var station=$scope.stationIncharge.map(function (station) {
               if($scope.subStation[i].station===station){
               $scope.subStations.push($scope.substation[i]);
              }
                return station
             });
            }
            auditsDoneService.getMiscellaneousData(JSON.stringify({
              name : "year"
            })).then(
              function(data) { 
                $scope.year = JSON.parse(data.data.data)[0].data;
              },
              function(msg) {
              });
              auditsDoneService.getMiscellaneousData(JSON.stringify({
                name : "auditType"
              })).then(
                function(data) { 
                  $scope.auditType = JSON.parse(data.data.data)[0].data;
                },
                function(msg) {
                });

        },
        function(msg) {
        });
    }





  }
})();
