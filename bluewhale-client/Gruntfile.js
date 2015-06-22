module.exports = function (grunt) {
    'use strict';

    /**
     * 自动加载grunt任务列表
     */
    require('load-grunt-tasks')(grunt);

    /**
     * 加载时间统计插件
     */
    require('time-grunt')(grunt);

    /**
     * 任务配置
     */
    grunt.initConfig({

        /**
         * Package
         */
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Meta
         */
        meta: {
            srcDir: 'src',
            buildDir: 'build',
            releaseDir: 'release',
            vendorJsFiles: [
                'vendor/underscore/underscore.js',
                'vendor/holderjs/holder.js',

                'vendor/angular/angular.js',
                'vendor/angular-ui-router/release/angular-ui-router.js',
                'vendor/angular-animate/angular-animate.js',
                'vendor/angular-resource/angular-resource.js',
                'vendor/angular-sanitize/angular-sanitize.js',
                'vendor/angular-messages/angular-messages.js',
                'vendor/angular-bootstrap/ui-bootstrap-tpls.js',
                'vendor/angular-translate/angular-translate.js',

                'vendor/ng-multi-transclude/src/multi-transclude.js',

                'vendor/spin.js/spin.js',
                'vendor/angular-spinner/angular-spinner.js',

                'vendor/es5-shim.js',
                'vendor/angular-file-upload/angular-file-upload.js',

                'vendor/angular-growl-v2/build/angular-growl.js',
                'vendor/angular-loading-bar/build/loading-bar.js',
            ],
            vendorCssFiles: [
                'vendor/angular-growl-v2/build/angular-growl.css',
                'vendor/angular-loading-bar/build/loading-bar.css'
            ],
            testingJsFiles: [
                'vendor/angular-mocks/angular-mocks.js'
            ]
        },

        /**
         * Clean
         */
        clean: {
            build: ['<%= meta.buildDir %>'],
            release: ['<%= meta.releaseDir %>'],
            releaseCache: ['<%= meta.releaseDir %>/cache']
        },

        /**
         * Jshint
         */
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: [
                'Gruntfile.js'
            ],
            srcJsFiles: [
                '<%= meta.srcDir %>/!(assets)/**/!(*.spec).js'
            ],
            srcJsUnitFiles: [
                '<%= meta.srcDir %>/!(assets)/**/*.spec.js'
            ]
        },

        /**
         * ngTemplates
         */
        ngtemplates: {
            options: {
                module: 'app'
            },
            app: {
                cwd: '<%= meta.srcDir %>/app',
                src: '**/*.html',
                dest: '<%= meta.buildDir %>/compiled/templates/app.js'
            }
        },

        /**
         * Less
         */
        less: {
            build: {
                src: '<%= meta.srcDir %>/less/main.less',
                dest: '<%= meta.buildDir %>/compiled/css/main.css'
            }
        },

        /**
         * Copy
         */
        copy: {
            srcJs2Build: {
                expand: true,
                cwd: '<%= meta.srcDir %>',
                src: './!(assets)/**/!(*.spec).js',
                dest: '<%= meta.buildDir %>/'
            },
            srcAssets2Build: {
                expand: true,
                cwd: '<%= meta.srcDir %>',
                src: 'assets/**',
                dest: '<%= meta.buildDir %>/'
            },
            srcAssets2Release: {
                expand: true,
                cwd: '<%= meta.srcDir %>',
                src: 'assets/**',
                dest: '<%= meta.releaseDir %>/'
            },
            vendorJs2Build: {
                expand: true,
                cwd: '.',
                src: '<%= meta.vendorJsFiles %>',
                dest: '<%= meta.buildDir %>/'
            },
            vendorCss2Build: {
                expand: true,
                cwd: '.',
                src: '<%= meta.vendorCssFiles %>',
                dest: '<%= meta.buildDir %>/'
            }
        },

        /**
         * Index
         */
        index: {
            build: {
                tpl: '<%= meta.srcDir %>/index.html',
                html: '<%= meta.buildDir %>/index.php',
                src: [
                    '<%= meta.vendorCssFiles %>',
                    '<%= meta.buildDir %>/assets/**/*.css',
                    '<%= meta.buildDir %>/compiled/**/*.css',
                    '<%= meta.vendorJsFiles %>',
                    '<%= meta.buildDir %>/assets/**/*.js',
                    '<%= meta.buildDir %>/{app,components}/**/!(*.@(controller|directive|service|filter|spec|resource)).js',
                    '<%= meta.buildDir %>/{app,components}/**/*.js',
                    '<%= meta.buildDir %>/compiled/**/*.js'
                ]
            },
            release: {
                tpl: '<%= meta.srcDir %>/index.html',
                html: '<%= meta.releaseDir %>/index.php',
                src: [
                    '<%= concat.releaseJs.dest %>',
                    '<%= concat.releaseCss.dest %>'
                ]
            }
        },

        /**
         * Karma
         */
        karma: {
            options: {
                configFile: 'test/unit/karma.conf.js',
                files: [
                    '<%= meta.vendorJsFiles %>',
                    '<%= meta.testingJsFiles %>',
                    '<%= meta.buildDir %>/assets/**/*.js',
                    '<%= meta.buildDir %>/{app,components}/**/!(*.@(controller|directive|service|filter|spec|resource)).js',
                    '<%= meta.buildDir %>/{app,components}/**/*.js',
                    '<%= meta.buildDir %>/compiled/**/*.js',
                    '<%= meta.srcDir %>/{app,components}/**/*.spec.js'
                ]
            },
            unit: {
                background: true
            },
            continuous: {
                singleRun: true
            }
        },

        /**
         * Watch
         */
        watch: {
            gruntfile: {
                files: ['<%= jshint.gruntfile %>'],
                tasks: ['jshint:gruntfile'],
                options: {
                    reload: true
                }
            },
            srcJs: {
                files: ['<%= jshint.srcJsFiles %>'],
                tasks: ['newer:jshint:srcJsFiles', 'karma:unit:run', 'newer:copy:srcJs2Build', 'index:build']
            },
            srcJsUnit: {
                files: ['<%= jshint.srcJsUnitFiles %>'],
                tasks: ['newer:jshint:srcJsUnitFiles', 'karma:unit:run']
            },
            srcAppTpl: {
                files: ['<%= meta.srcDir %>/app/**/*.html'],
                tasks: ['ngtemplates:app']
            },
            srcComponentsTpl: {
                files: ['<%= meta.srcDir %>/components/**/*.html'],
                tasks: ['ngtemplates:components']
            },
            srcAssets: {
                files: ['<%= meta.srcDir %>/assets/**'],
                tasks: ['newer:copy:srcAssets2Build', 'index:build']
            },
            srcLess: {
                files: ['<%= meta.srcDir %>/**/*.less'],
                tasks: ['less:build']
            },
            srcIndexHtml: {
                files: ['<%= meta.srcDir %>/index.html'],
                tasks: ['index:build']
            },
            build: {
                files: ['<%= meta.buildDir %>/**'],
                options: {
                    livereload: 35729
                }
            }
        },

        /**
         * Connect
         */
        connect: {
            build: {
                options: {
                    port: 9001,
                    hostname: 'localhost',
                    base: '<%= meta.buildDir %>',
                    livereload: '<%= watch.build.options.livereload %>',
                    open: false
                }
            }
        },

        /**
         * ngAnnotate
         */
        ngAnnotate: {
            release: {
                files: [
                    {
                        expand: true,
                        src: '<%= meta.buildDir %>/app/**/*.js',
                        dest: '<%= meta.releaseDir %>/cache/annotated/'
                    }
                ]
            }
        },

        /**
         * concat
         */
        concat: {
            releaseJs: {
                src: [
                    '<%= meta.vendorJsFiles %>',
                    '<%= meta.releaseDir %>/cache/annotated/**/!(*.@(controller|directive|service|filter|spec|resource)).js',
                    '<%= meta.releaseDir %>/cache/annotated/**/*.js',
                    '<%= meta.buildDir %>/compiled/templates/**/*.js'
                ],
                dest: '<%= meta.releaseDir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'
            },
            releaseCss: {
                src: [
                    '<%= meta.vendorCssFiles %>',
                    '<%= meta.buildDir %>/compiled/css/**/*.css'
                ],
                dest: '<%= meta.releaseDir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
            }
        },

        /**
         * Minify the sources!
         */
        uglify: {
            release: {
                files: {
                    '<%= concat.releaseJs.dest %>': '<%= concat.releaseJs.dest %>'
                }
            }
        },

        /**
         * Minify css
         */
        cssmin: {
            release: {
                files: {
                    '<%= concat.releaseCss.dest %>': '<%= concat.releaseCss.dest %>'
                }
            }
        }

    });

    /**
     * Build：主要完成JS格式校验、模板抽取和CSS编译
     */
    grunt.registerTask('build', [
        'clean:build',
        'jshint:gruntfile',
        'jshint:srcJsFiles',
        'jshint:srcJsUnitFiles',
        'ngtemplates',
        'less:build',
        'copy:vendorJs2Build',
        'copy:vendorCss2Build',
        'copy:srcJs2Build',
        'copy:srcAssets2Build',
        'index:build',
        'karma:continuous'
    ]);

    /**
     * Serve：先执行build，然后启动web服务和测试服务，并监听文件变化
     */
    grunt.registerTask('serve', [
        'build',
        'connect:build', // !important
        'karma:unit', // !important
        'watch'
    ]);

    /**
     * Release：对build结果进行合并、压缩等优化工作，生成可部署结果
     */
    grunt.registerTask('release', [
        'build',
        'clean:release',
        'copy:srcAssets2Release',
        'ngAnnotate:release',
        'concat:releaseJs',
        'concat:releaseCss',
        'uglify:release',
        'cssmin:release',
        'index:release',
        'clean:releaseCache'
    ]);

    /**
     * Default：build && release
     */
    grunt.registerTask('default', [
        'release'
    ]);

    /**
     * Index：收集所有的js和css资源，并作为变量注入模板，动态生成index.html
     */
    grunt.registerMultiTask('index', 'Generate index.html', function () {
        var dirRegex = new RegExp('^(' + grunt.config('meta.buildDir') + '|' + grunt.config('meta.releaseDir') + ')\/', 'g');
        var jsFiles = filterByType(this.filesSrc, 'js').map(function (file) {
            return file.replace(dirRegex, '');
        });
        var cssFiles = filterByType(this.filesSrc, 'css').map(function (file) {
            return file.replace(dirRegex, '');
        });

        grunt.file.copy(this.data.tpl, this.data.html, {
            process: function (contents) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles
                    }
                });
            }
        });

        /**
         * 按照类型进行文件过滤
         */
        function filterByType(files, type) {
            var types = {
                js: /\.js$/,
                css: /\.css$/
            };
            if (types.hasOwnProperty(type)) {
                return files.filter(function (file) {
                    return file.match(types[type]);
                });
            }
            return files;
        }
    });

};