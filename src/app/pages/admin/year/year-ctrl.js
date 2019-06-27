/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.admin.year', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'smart-table'])
    .config(routeConfig)
    .controller('year-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.admin.year', {
        url: '/year',
        templateUrl: 'app/pages/admin/year/year.html',
        title: 'Year',
        controller: 'year-ctrl',
        sidebarMeta: {
          icon: 'ion-android-send',
          order: 0,
        },
        authenticate: true
      });
  }

 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter,$state , editableOptions, editableThemes, yearService, $uibModal, $log, _, toasterService) {
    
    $scope.init=function(){
      $scope.year = {};
      $scope.rowCollection=[];
      $scope.getYear();

    }

    $scope.addNewRecord = function(){
      $scope.year.yearData.push({
        year:""
      });
    }

    $scope.getYear= function(){
     
      yearService.getYearData(JSON.stringify({
        name : "year"
      })).then(
        function(data) { 
          $scope.year.yearData = JSON.parse(data.data.data)[0].data;
          $scope.rowCollection = JSON.parse(data.data.data)[0].data;
          $scope.year.yearID = JSON.parse(data.data.data)[0]._id;
          $scope.year.yearName = JSON.parse(data.data.data)[0].name;
        },
        function(msg) {
        });
    }

    $scope.editYearData = function(data, index,counter){
      if(counter==0)
      $scope.year.yearData[index]=data;
      else
      $scope.year.yearData.splice(index, 1);
      yearService.editYearData(JSON.stringify({
          _id: $scope.year.yearID,
          name: $scope.year.yearName,
          data: $scope.year.yearData,
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
