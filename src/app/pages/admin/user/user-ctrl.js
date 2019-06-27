/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.admin.user', ['ngAnimate', 'ngSanitize', 'ui.bootstrap','smart-table'])
    .config(routeConfig)
    .controller('user-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.admin.user', {
        url: '/user',
        templateUrl: 'app/pages/admin/user/user.html',
        title: 'User',
        controller: 'user-ctrl',
        sidebarMeta: {
          icon: 'ion-android-send',
          order: 0,
        },
        authenticate: true
      });
  }

 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter,$state , editableOptions, editableThemes, userService, $uibModal, $log, _, toasterService) {
   $scope.stationIncharge=["yes","no"];
    $scope.init=function(){
      $scope.user = {};
      $scope.location=[];
      $scope.rowCollection=[];
      $scope.getUser();

    }
   
   
   
    $scope.addNewRecord = function(){
      $scope.user.push({
        location:"",
        empID:"",
        stationIncharge:"no",
        counter:0
        
      });
    }

    

    $scope.getUser= function(){
     
      userService.getUserData().then(
        function(data) { 
          $scope.user= JSON.parse(data.data.data);
          $scope.rowCollection = JSON.parse(data.data.data);


          userService.getSubStationData(JSON.stringify({
            name : "station"
          })).then(
            function(data) { 
              $scope.location = JSON.parse(data.data.data)[0].data;
            },
            function(msg) {
            });

        },
        function(msg) {
        });
    }


    

    $scope.editUserData = function(data, index){
     if(data.counter===0)
     {data.counter=1;
      userService.addUserData(JSON.stringify({
        empID: data.empID,
        location: data.location,
        stationIncharge: data.stationIncharge,
        counter:data.counter
      })).then(function(){
       // toasterService.openSucessToast("Record has been successfully inserted/updated!");
        $state.reload();
      },function(){
        //toasterService.openErrorToast("Record has been successfully inserted/updated!");
      }) 

     }
     else
     {
      userService.editUserData(JSON.stringify({
          _id: data._id,
          empID: data.empID,
          location: data.location,
          stationIncharge: data.stationIncharge,
          counter:data.counter
        })).then(function(){
         // toasterService.openSucessToast("Record has been successfully inserted/updated!");
          $state.reload();
        },function(){
          //toasterService.openErrorToast("Record has been successfully inserted/updated!");
        })      
      }
      }
 


      $scope.deleteUserData = function(data, index){
        
         userService.deleteUserData(JSON.stringify({
           _id: data._id,
           empID: data.empID,
           location: data.location,
           stationIncharge: data.stationIncharge,
           counter:data.counter
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
