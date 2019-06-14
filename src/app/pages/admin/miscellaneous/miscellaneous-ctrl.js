/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.admin.miscellaneous', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('miscellaneous-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.admin.miscellaneous', {
        url: '/miscellaneous',
        templateUrl: 'app/pages/admin/miscellaneous/miscellaneous.html',
        title: 'Miscellaneous',
        controller: 'miscellaneous-ctrl',
        sidebarMeta: {
          icon: '',
          order: 0,
        },
        authenticate: true
      });
  }

 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter,$state , editableOptions, editableThemes, miscellaneousService, $uibModal, $log, _, toasterService) {
   
  }
})();
