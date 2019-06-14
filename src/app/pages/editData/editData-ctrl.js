/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.editData', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
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

 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter,$state , editableOptions, editableThemes, editDataService, $uibModal, $log, _, toasterService) {
   
  }
})();
