(function() {
  'use strict';

  angular.module('BlurAdmin.pages.authSignIn')
    .controller('authSignInCtrl', authSignInCtrl);

    authSignInCtrl.$inject = ['$scope', 'localStorage', '$state'];
  /** @ngInject */
  function authSignInCtrl($scope, localStorage, $state, authservice, $q) {
      var vm = this;
      vm.login = login;
      init();
      function init() {
        localStorage.clear();
      }

      function login() {
        var credentials = {
          user: vm.user,
          password: vm.password
        };
        $state.go('main.dashboard');
        // authservice.authenticate(credentials.user,credentials.password).then(function(data) {
        //   localStorage.setObject('dataUser', credentials);
        //   $state.go('main.dashboard'); 
        // }, function() { 
        //   $state.go('404');
        // });
      }
    }
  })();