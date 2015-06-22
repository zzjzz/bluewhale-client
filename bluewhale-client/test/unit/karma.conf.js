module.exports = function (config) {
    'use strict';

    config.set({

        basePath: '../../',

        frameworks: ['jasmine'],

        files: [],

        exclude: [],

        preprocessors: {},

        reporters: ['dots'],

        port: 9876,

        runnerPort: 9100,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: ['Firefox'],

        singleRun: false,

        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-firefox-launcher'
        ]
    });
};