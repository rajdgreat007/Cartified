angular.module('cartApp', ['services.cart'])
    .controller('MainCtrl', ['$scope', 'Cart', function ($scope, Cart) {
        $scope.items = [
            {
                id: 1, name: 'item1'
            },
            {
                id: 2, name: 'item2'
            },
            {
                id: 3, name: 'item3'
            },
            {
                id: 4, name: 'item4'
            }
        ];
        $scope.cart = Cart.getCart();

        $scope.addItemToCart = function (item, quantity) {
            var itemCopy = angular.copy(item);
            itemCopy.quantity = quantity||1;
            Cart.addItem(itemCopy);
        };

        $scope.deleteItemFromCart = function (itemId) {
            Cart.removeItem(itemId);
        };

        $scope.updateQuantity = function (itemId, newQuantity) {
            Cart.changeQuantity(itemId, newQuantity);
        };

        $scope.emptyCart = function(){
          Cart.clear();
        };

        $scope.$on('cartUpdated', function (event, cart) {
            $scope.cart = cart;
        });
    }]);