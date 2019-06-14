/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.admin', ['BlurAdmin.pages.admin.user','BlurAdmin.pages.admin.miscellaneous','ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('admin-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.admin', {
        url: '/admin',
        templateUrl: 'app/pages/admin/admin.html',
        title: 'Admin',
        controller: 'admin-ctrl',
        sidebarMeta: {
          icon: 'ion-ios-person-outline',
          order: 0,
        },
        authenticate: true
      });
  }

 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter,$state , editableOptions, editableThemes, adminService, $uibModal, $log, _, toasterService) {
   
  }
})();
