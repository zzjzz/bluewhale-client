(function () {
    'use strict';

    angular
        .module('app.components.holder', [])
        .directive('myHolder', myHolder);

    function myHolder() {
        return {
            link: function (scope, element, attrs) {
                attrs.$set('data-src', attrs.myHolder);
                Holder.run({images: element[0], nocss: true});
            }
        };
    }
})();