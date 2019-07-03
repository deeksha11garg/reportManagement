/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.admin.subStation', ['ngAnimate', 'ngSanitize', 'ui.bootstrap','smart-table'])
    .config(routeConfig)
    .controller('subStation-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.admin.subStation', {
        url: '/subStation',
        templateUrl: 'app/pages/admin/subStation/subStation.html',
        title: 'Sub-Stations',
        controller: 'subStation-ctrl',
        sidebarMeta: {
          icon: 'ion-android-send',
          order: 0,
        },
        authenticate: true
      });
  }

 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter,$state , editableOptions, editableThemes, subStationService, $uibModal, $log, _, toasterService) {
   
    $scope.init=function(){
      $scope.subStation = {};
      $scope.station=[];
      
 $scope.rowCollection=[];
      $scope.getSubStation();
    }

    $scope.page_size = 7
    $scope.current_page = 1
$scope.rembemberCurrentPage = function(p) {
  $scope.current_page = p
}

    $scope.addNewRecord = function(){
      $scope.subStation.subStationData.push({
        station:"",
        subStation:""
      });
      $scope.rowCollection.push({
        station:"",
        subStation:""
      });
      
    }

    $scope.getSubStation= function(){
     
      subStationService.getSubStationData(JSON.stringify({
        name : "subStation"
      })).then(
        function(data) { 
          $scope.subStation.subStationData = JSON.parse(data.data.data)[0].data;
          $scope.rowCollection =JSON.parse(data.data.data)[0].data;
          $scope.subStation.subStationID = JSON.parse(data.data.data)[0]._id;
          $scope.subStation.subStationName = JSON.parse(data.data.data)[0].name;

          subStationService.getSubStationData(JSON.stringify({
            name : "station"
          })).then(
            function(data) { 
              $scope.station = JSON.parse(data.data.data)[0].data;
            },
            function(msg) {
            });

            
        },
        function(msg) {
        });
    }


    // $scope.rowCollection = [];

    // for (id; id < 5; id++) {
    //     $scope.rowCollection.push(generateRandomItem(id));
    // }


    

    $scope.editSubStationData = function(data, index,counter){
      if(counter==0){
        data.subStation = data.subStation.toUpperCase();
        data.station = data.station.station;
        $scope.rowCollection[index]=data;
      }
      else
      $scope.rowCollection.splice(index, 1);
      subStationService.editSubStationData(JSON.stringify({
          _id: $scope.subStation.subStationID,
          name: $scope.subStation.subStationName,
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
