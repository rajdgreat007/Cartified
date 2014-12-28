angular.module('services.cart', ['services.reviewer'])
    .service('Cart', ['$rootScope', 'Reviewer', function ($rootScope, Reviewer) {
        var key = 'cart';
        var self = this;

        //private methods
        var save = function (cart) {
            Reviewer.review(cart)
                .then(function (data) {
                    if (data.valid) persist(cart);
                });
        };

        var persist = function (cart) {
            localStorage.setObject(key, cart);
            refresh(cart);
        };

        var refresh = function (cart) {
            $rootScope.$broadcast('cartUpdated', cart);
        };

        var findItemIndexInCart = function (cart, itemId) {
            var itemIndex = -1;
            angular.forEach(cart, function (item, idx) {
                if (item.id == itemId) itemIndex = idx;
            });
            return itemIndex;
        };

        //public methods
        self.getCart = function () {
            return localStorage.getObject(key) || [];
        };

        self.addItem = function (item) {
            var cart = self.getCart();
            var itemIndexInCart = findItemIndexInCart(cart, item.id);
            if (itemIndexInCart == -1) { //item not found in cart
                cart.push(item);
            } else { //item already present in the cart
                cart[itemIndexInCart].quantity += item.quantity;
            }
            save(cart);
        };

        self.addItems = function (items) {
            angular.forEach(items, function (item) {
                self.addItem(item);
            });
        };

        self.removeItem = function (itemId) {
            var cart = self.getCart();
            var itemIndexInCart = findItemIndexInCart(cart, itemId);
            if (itemIndexInCart !== -1) {
                cart.splice(itemIndexInCart, 1);
                save(cart);
            }
        };

        self.clear = function () {
            persist([]);
        };


        self.changeQuantity = function (itemId, newQuantity) {
            var cart = self.getCart();
            var itemIndexInCart = findItemIndexInCart(cart, itemId);
            if (itemIndexInCart !== -1) {
                cart[itemIndexInCart].quantity = newQuantity;
                save(cart);
            }
        };

    }]);
