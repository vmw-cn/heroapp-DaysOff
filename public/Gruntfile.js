module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // -- Clean Config ---------------------------------------------------------

        clean: {
            build: ['<%= staticDir %>/'],
            release: ['<%= staticDir %>/css/base', '<%= staticDir %>/css/ui']
        },

        // -- Copy Config ----------------------------------------------------------

        copy: {
            build: {
                files: [{
                    expand: true,
                    flatten: false,
                    cwd: 'css/',
                    src: ['**/*'],
                    dest: '<%= staticDir %>/css'
                }, {
                    expand: true,
                    flatten: false,
                    cwd: 'js/',
                    src: ['**/*.js'],
                    dest: '<%= staticDir %>/js'
                }, {
                    expand: true,
                    flatten: false,
                    cwd: 'img/',
                    src: ['**/*'],
                    dest: '<%= staticDir %>/img'
                }, {
                    expand: true,
                    flatten: false,
                    cwd: 'pages/',
                    src: ['**/*'],
                    dest: '<%= staticDir %>/pages'
                }, {
                    expand: true,
                    src: ['index.html'],
                    dest: '<%= staticDir %>'
                }]
            }
        },

        // -- Concat Config ---------------------------------------------------------
        // We use r.js to concat JavaScript files and solve the dependencies, see 'requirejs' section
        concat: {
            options: {
                separator: ';' // If you're post-processing concatenated JavaScript files with a minifier, you may need to use a semicolon ';' as the separator.
            },
            css: {
                options: {
                    separator: ''
                },
                files: {
                    '<%= staticDir %>/css/common.css': [
                        '<%= staticDir %>/css/base/reset.css',
                        '<%= staticDir %>/css/base/base.css',
                        '<%= staticDir %>/css/base/layout.css',
                        '<%= staticDir %>/css/base/pure.css',
                        '<%= staticDir %>/css/ui/**/*.css',
                        '<%= staticDir %>/css/base/tmpst.css',
                    ]
                }
            }
        },

        // -- Uglify Config --------------------------------------------------------

        uglify: {
            options: {
                beautify: false,
                mangle: true,
                report: 'gzip'
            },
            release: {
                files: [{
                    expand: true,
                    cwd: 'js/',
                    src: ['**/*.js'],
                    dest: '<%= staticDir %>/js'
                }, {
                    expand: true,
                    cwd: 'pages/',
                    src: ['**/*.js'],
                    dest: '<%= staticDir %>/pages'
                }]
            }
        },

        // -- CSSLint Config -------------------------------------------------------

        csslint: {
            options: {
                csslintrc: '.csslintrc',
                absoluteFilePathsForFormatters: true
            },
            // output the result to stdout
            normal: {
                src: [
                    'css/base/**/*.css',
                    '!css/base/pure.css'
                ]
            },
            // output the result to formatters
            format: {
                options: {
                    formatters: [{
                        id: 'text',
                        dest: 'report/csslint_text.txt'
                    }, {
                        id: 'csslint-xml',
                        dest: 'report/csslint.xml'
                    }]
                },
                src: [
                    'css/base/**/*.css',
                    '!css/base/pure.css'
                ]
            }
        },

        // -- CSSMin Config --------------------------------------------------------

        cssmin: {
            options: {
                keepSpecialComments: 0,
                report: 'gzip'
            },

            minify: {
                files: [{
                    src: '<%= staticDir %>/css/common.css',
                    dest: '<%= staticDir %>/css/common.css'
                }]
            }
        },

        // -- JSHint Config --------------------------------------------------------

        jshint: {
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                jshintrc: '.jshintrc',
                force: true,
                //reporter: 'jslint',
                //reporterOutput: 'report/jshint.xml'
            },

            // define the files to lint
            files: [
                'js/app/home.js',
                'js/core/tmpst.js',
                'js/routes/home.js',
                'pages/home/**/*.js',
                '!pages/home/**/*.html.js'
            ],
        },

        // -- QUnit Config --------------------------------------------------------

        qunit: {
            files: ['test/**/*.html']
        },

        // -- Watch/Observe Config -------------------------------------------------

        observe: {
            jade: {
                files: 'pages/home/**/*.jade',
                tasks: ['jade'],

                options: {
                    interrupt: true
                }
            }
        },

        // -- Jade Config ------------------------------------------------------------

        jade: {
            pages: {
                options: {},
                expand: true,
                src: ['pages/home/**/*.jade', 'js/**/*.jade']
            }
        },

        // -- Requirejs config -------------------------------------------------------

        requirejs: {
            compile: {
                options: {
                    baseUrl: './',
                    mainConfigFile: 'config.js',
                    out: '<%= staticDir %>/pages/home/<%= routes %>.js',
                    optimize: 'uglify2',
                    uglify2: {
                        output: {
                            beautify: false
                        },
                        compress: {
                            sequences: true,
                            drop_debugger: true,
                            global_defs: {
                                DEBUG: false
                            }
                        },
                        warnings: true,
                        mangle: true
                    },
                }
            }
        },

        // -- JSDoc config -------------------------------------------------------

        jsdoc: {
            dist: {
                src: ['pages/**/*.js'],
                options: {
                    destination: 'doc'
                }
            }
        },

        // -- Docco config -------------------------------------------------------

        docco: {
            debug: {
                src: ['pages/**/page.js'],
                options: {
                    output: 'docs/'
                }
            }
        },

        // -- mocha config -------------------------------------------------------

        simplemocha: {
            options: {
                globals: ['chai'],
                timeout: 3000,
                ignoreLeaks: false,
                //grep: '*-test',
                ui: 'bdd',
                reporter: 'tap'
            },
            all: {
                src: 'test/**/*.js'
            }
        },

        // -- Const variables --------------------------------------------------------

        staticDir: '../static', // depoly directory
        routes: 'routes'
    });

    // -- Main Tasks ---------------------------------------------------------------

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-docco');
    grunt.loadNpmTasks('grunt-simple-mocha');

    grunt.registerTask('default', [
        'clean:build',
        'jade:pages',
        'copy:build',
        'requirejs',
        'concat:css',
        'docco'
    ]);

    grunt.registerTask('test', [
        'jshint',
        'csslint'
    ]);

    grunt.registerTask('release', [
        'test',
        'default',
        'cssmin',
        'uglify',
        'clean:release'
    ]);

    // Makes the `watch` task run a build first.
    grunt.renameTask('watch', 'observe');
    grunt.registerTask('watch', ['default', 'observe']);



    // -- Jade Task -------------------------------------------------------------

    grunt.registerMultiTask('jade', 'Convert Jade Template to JS client-side functions', function () {
        var jade = require('jade');
        var path = require('path');
        var tally = 0;
        var jadeOptions = {
            compileDebug: false,
            client: true,
            self: false,
            debug: false
        };

        var tpl = [
            '(function (wndw) {',
            'var jadify = function (jade) {',
            'return <%= compiledJadeStr %>',
            '};',
            '"function" == typeof define && define.amd ? define("<%= templateName %>", ["js/lib/jade"], function (e) {',
            'return jadify(e); ',
            '}) : wndw.jade.templates.<%= templateBaseName %>= jadify(wndw.jade.helpers);',
            '}(window));'
        ].join('\n');

        this.files.forEach(function (filePair) {
            filePair.src.forEach(function (file) {
                grunt.file.write(file.replace(/\.jade$/, '.js'), grunt.template.process(tpl, {
                    data: {
                        compiledJadeStr: jade.compile(grunt.file.read(file), jadeOptions).toString(),
                        templateName: file.replace(/\.jade$/, ''),
                        templateBaseName: path.basename(file, '.html.jade')
                    }
                }));

                tally += 1;
                grunt.log.debug(file);
            });
        });
        grunt.log.writeln('Convert Jade Templates on ' + String(tally).cyan + ' files.');
    });
}