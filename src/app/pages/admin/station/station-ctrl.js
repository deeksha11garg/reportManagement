/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.admin.station', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('station-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.admin.station', {
        url: '/station',
        templateUrl: 'app/pages/admin/station/station.html',
        title: 'Stations',
        controller: 'station-ctrl',
        sidebarMeta: {
          icon: 'ion-android-send',
          order: 0,
        },
        authenticate: true
      });
  }

 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter,$state , editableOptions, editableThemes, stationService, $uibModal, $log, _, toasterService) {
  
    $scope.init=function(){
      $scope.station = {};
      $scope.getStation();

    }
   
   
   
    $scope.addNewRecord = function(){
      $scope.station.stationData.push("");
    }

    $scope.getStation= function(){
     
      stationService.getStationData(JSON.stringify({
        name : "station"
      })).then(
        function(data) { 
          $scope.station.stationData = JSON.parse(data.data.data)[0].data;
          $scope.station.stationID = JSON.parse(data.data.data)[0]._id;
          $scope.station.stationName = JSON.parse(data.data.data)[0].name;
        },
        function(msg) {
        });
    }


    

    $scope.editStationData = function(data, index,counter){
      if(counter==0)
      $scope.station.stationData[index]=data;
      else
      $scope.station.stationData.splice(index, 1);
      stationService.editStationData(JSON.stringify({
          _id: $scope.station.stationID,
          name: $scope.station.stationName,
          data: $scope.station.stationData,
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
