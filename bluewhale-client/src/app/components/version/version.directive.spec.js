(function () {
    'use strict';

    describe('app.components.version module', function () {
        beforeEach(module('app.components.version'));

        describe('version directive', function () {
            it('should print current version', function () {
                module(function ($provide) {
                    $provide.value('version', 'TEST_VER');
                });
                inject(function ($compile, $rootScope) {
                    var element = $compile('<span version></span>')($rootScope);
                    expect(element.text()).toEqual('TEST_VER');
                });
            });
        });
    });
})();