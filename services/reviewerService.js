angular.module('services.reviewer', [])
    .service('Reviewer', ['$rootScope', '$q', '$http', function ($rootScope, $q, $http) {
        this.review = function (cart) {
            var deferred = $q.defer();
            /******************************** we can hit the server to check if cart is valid

             $http.post('cart/validation/url',{cart:cart})
             .success(function (data) {
             deferred.resolve(data);
             })
             .error(function (data) {
             deferred.reject(data);
             });

             *****************************/
            //Mimicking the above effect with timeout
            setTimeout(function () {
                deferred.resolve({valid: true});
            },1000);
            return deferred.promise;
        };
    }]);
