/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.auditsDone', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
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
   
  }
})();
