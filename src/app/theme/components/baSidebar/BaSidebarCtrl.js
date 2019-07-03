/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .controller('BaSidebarCtrl', BaSidebarCtrl);

  /** @ngInject */
  function BaSidebarCtrl($scope, baSidebarService) {

    $scope.menuItems = baSidebarService.getMenuItems();

    $scope.menuItemsAccess = [];
    if(localStorage.getItem('isAdmin')==='false')
    $scope.stationIncharge= JSON.parse(localStorage.getItem("stationIncharge"));
    if(localStorage.getItem('isAdmin')==='true')
    var jsonMenu = ['main.admin','main.editData']; // JSON from Service

    else if($scope.stationIncharge.length==0)
    var jsonMenu = ['main.dashboard']; // JSON from Service
    
    else
    var jsonMenu = ['main.dashboard','main.auditsDone','main.viewData','main.reports']; // JSON from Service
    

    angular.forEach($scope.menuItems, function (baSideBarMenu) {
        angular.forEach(jsonMenu, function (accessMenu) {
            if (accessMenu === baSideBarMenu.name) {
                $scope.menuItemsAccess.push(baSideBarMenu)
                return;
            }
        })
    })
    $scope.menuItems = $scope.menuItemsAccess;
  









    $scope.defaultSidebarState = $scope.menuItems[0].stateRef;

    $scope.hoverItem = function ($event) {
      $scope.showHoverElem = true;
      $scope.hoverElemHeight =  $event.currentTarget.clientHeight;
      var menuTopValue = 66;
      $scope.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - menuTopValue;
    };

    $scope.$on('$stateChangeSuccess', function () {
      if (baSidebarService.canSidebarBeHidden()) {
        baSidebarService.setMenuCollapsed(true);
      }
    });
  }
})();