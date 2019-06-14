/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.delivery-del', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('Delivery-del-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.delivery-del', {
        url: '/delivery-del',
        templateUrl: 'app/pages/delivery-del/delivery-del.html',
        title: 'Delhi Delivery',
        controller: 'Delivery-del-ctrl',
        sidebarMeta: {
          icon: '',
          order: 0,
        },
        authenticate: true
      });
  }

 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter,$state , editableOptions, editableThemes, delhiDeliveryService, $uibModal, $log, _, toasterService) {
   
  }
})();
