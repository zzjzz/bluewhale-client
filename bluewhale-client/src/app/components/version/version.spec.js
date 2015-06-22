(function () {
    'use strict';

    describe('app.components.version module', function () {
        beforeEach(module('app.components.version'));

        describe('version service', function () {
            it('should return current version', inject(function (version) {
                expect(version).toEqual('0.1');
            }));
        });
    });
})();