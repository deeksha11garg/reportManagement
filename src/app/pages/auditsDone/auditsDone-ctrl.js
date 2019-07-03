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
      $scope.subStations=[];
     $scope.todayDate= new Date().getFullYear() +"-" + ((new Date().getMonth() + 1)<10 ? ("0"+ (new Date().getMonth() + 1)) : (new Date().getMonth() + 1))  + "-" + ((new Date().getDate())<10?("0"+ (new Date().getDate())) :  (new Date().getDate()));
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
          empID:Number(localStorage.getItem("username")),
          auditType:$scope.auditTypeSelected.auditType,
          year:$scope.yearSelected.year,
          station:$scope.stationSelected,
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
    
    $scope.page_size = 7
    $scope.current_page = 1
$scope.rembemberCurrentPage = function(p) {
  $scope.current_page = p
}

    $scope.cancel = function() {
        $scope.$modalInstance.dismiss('cancel');
    };
    


    $scope.getauditsDone= function(){
     $scope.stationIncharge= JSON.parse(localStorage.getItem("stationIncharge"));
      auditsDoneService.getauditsDone($scope.stationIncharge).then(
        function(data) { 
          $scope.auditsDone= JSON.parse(data.data.data);
          $scope.rowCollection = JSON.parse(data.data.data);
          

       


          auditsDoneService.getMiscellaneousData(JSON.stringify({
            name : "subStation"
          })).then(
            function(substationdata) { 
              $scope.subStation = JSON.parse(substationdata.data.data)[0].data;


              auditsDoneService.getMiscellaneousData(JSON.stringify({
                name : "year"
              })).then(
                function(data) { 
                  $scope.year = JSON.parse(data.data.data)[0].data;

                  auditsDoneService.getMiscellaneousData(JSON.stringify({
                    name : "auditType"
                  })).then(
                    function(data) { 
                      $scope.auditType = JSON.parse(data.data.data)[0].data;
                      for(var i=0;i<$scope.subStation.length;i++)
                      {
                      for(var j=0;j<$scope.stationIncharge.length;j++) {
                         if($scope.subStation[i].station===$scope.stationIncharge[j]){
                         $scope.subStations.push($scope.subStation[i]);
                        }
              
                       }
                      }
                    },
                    function(msg) {
                    });
    
                  

                },
                function(msg) {
                });
            },
            function(msg) {
            });
        
         

        },
        function(msg) {
        });
    }





  }
})();
