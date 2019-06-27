angular.module('BlurAdmin.pages.auditsDone').service('auditsDoneService', function ($http,$q) {
    this.message = '';
    

    this.getauditsDone = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://localhost:3006/getAuditsDoneRecord',reqJSON,{
            headers : {
                'Content-Type' : 'application/json; charset=utf-8'
                    }
            }).
            success(function (data, status) {
              if(data.msg === "success"){
                deferred.resolve({
                    data: data});
                }
            }).
            error(function (msg, status) {
                deferred.reject(msg);
            });
     
        return deferred.promise;
        }


        this.addAuditsDoneData = function(reqJSON){
            var deferred = $q.defer();
            $http.post('http://localhost:3006/addAuditsDoneRecord',reqJSON,{
                headers : {
                    'Content-Type' : 'application/json; charset=utf-8'
                }
              }).
              success(function (data, status) {
                console.log("inserted Successful")
                deferred.resolve({
                    data: data});
              }).
              error(function (msg, status) {
                deferred.reject(msg);
            });
            return deferred.promise;
        } 


        this.getMiscellaneousData = function(reqJSON){
            var deferred = $q.defer();
    
            $http.post('http://localhost:3006/getMiscellaneousRecord',reqJSON,{
                headers : {
                    'Content-Type' : 'application/json; charset=utf-8'
                        }
                }).
                success(function (data, status) {
                  if(data.msg === "success"){
                    deferred.resolve({
                        data: data});
                    }
                }).
                error(function (msg, status) {
                    deferred.reject(msg);
                });
           return deferred.promise;
        }
    
});