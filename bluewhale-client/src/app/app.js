(function () {
    'use strict';

    angular.module('app', [
        'ngAnimate',
        'ngResource',
        'ngSanitize',
        'ngMessages',

        'ui.router',
        'ui.bootstrap',
        'pascalprecht.translate',

        'angularSpinner',

        'app.components',
        'app.config',
        'app.layouts',
        'app.resources',
        'app.services',
        'app.states'
    ]);
})();