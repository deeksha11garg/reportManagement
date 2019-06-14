/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.viewData', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
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
   
  }
})();
