// Karma configuration
// Generated on Sun Dec 13 2015 00:20:50 GMT+0300 (Беларусь (зима))

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'jasmine-matchers'],


        // list of files / patterns to load in the browser
        files: [
            'demo/styles.css',
            'demo/utils.js',
            'node_modules/phantomjs-polyfill/bind-polyfill.js',
            'bower_components/jquery/dist/jquery.js',
            'jquery.responsive.js',
            'tests/**/*.js'
        ],


        // list of files to exclude
        exclude: [
        ],

        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-jasmine-matchers',
            'karma-coverage'
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'jquery.responsive.js': ['coverage']
        },

        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS', 'PhantomJS_custom'],

        customLaunchers: {
            'PhantomJS_custom': {
                base: 'PhantomJS',
                options: {
                    windowName: 'my-window',
                    settings: {
                        webSecurityEnabled: false
                    }
                },
                flags: ['--load-images=true'],
                debug: true
            }
        },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultanous
        concurrency: Infinity
    });
};
