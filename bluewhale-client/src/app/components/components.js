(function () {
    'use strict';

    angular.module('app.components', [
        'chieffancypants.loadingBar',
        'angular-growl',

        'app.components.footer',
        'app.components.holder',
        'app.components.nav',
        'app.components.pageHeader',
        'app.components.pageContent',
        'app.components.sidebar',
        'app.components.validators',
        'app.components.version'
    ]);
})();