/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.admin.auditType', ['ngAnimate', 'ngSanitize', 'ui.bootstrap','smart-table'])
    .config(routeConfig)
    .controller('auditType-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.admin.auditType', {
        url: '/auditType',
        templateUrl: 'app/pages/admin/auditType/auditType.html',
        title: 'Audit Type',
        controller: 'auditType-ctrl',
        sidebarMeta: {
          icon: 'ion-android-send',
          order: 0,
        },
        authenticate: true
      });
  }

 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter,$state , editableOptions, editableThemes, auditTypeService, $uibModal, $log, _, toasterService) {
   
    $scope.init=function(){
      $scope.auditType = {};
      $scope.rowCollection=[];
      $scope.getAuditType();

    }

    $scope.addNewRecord = function(){
      $scope.auditType.auditTypeData.push({
        auditType:""
      });
    }

    $scope.getAuditType= function(){
     
      auditTypeService.getAuditTypeData(JSON.stringify({
        name : "auditType"
      })).then(
        function(data) { 
          $scope.auditType.auditTypeData = JSON.parse(data.data.data)[0].data;
          $scope.rowCollection = JSON.parse(data.data.data)[0].data;
          $scope.auditType.auditTypeID = JSON.parse(data.data.data)[0]._id;
          $scope.auditType.auditTypeName = JSON.parse(data.data.data)[0].name;
        },
        function(msg) {
        });
    }

    $scope.editAuditTypeData = function(data, index,counter){
      if(counter==0)
      $scope.auditType.auditTypeData[index]=data;
      else
      $scope.auditType.auditTypeData.splice(index, 1);
      auditTypeService.editAuditTypeData(JSON.stringify({
          _id: $scope.auditType.auditTypeID,
          name: $scope.auditType.auditTypeName,
          data: $scope.auditType.auditTypeData,
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
