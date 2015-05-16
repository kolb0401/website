module.exports = function(grunt) {
  var path = require("path");
  grunt.initConfig({
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        regExp: false
      }
    },

    clean: {
      css: ['assets/css/dist', 'views/dist'],

      js: ['assets/js/dist', 'views/dist']
    },

    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'assets/sass',
          cssDir: 'assets/css/dist/',
          imagesDir: 'assets/images',
          environment: 'production'
        }
      },
      dev: {                    // Another target
        options: {
          sassDir: 'assets/sass',
          cssDir: 'assets/css/dist/',
          imagesDir: 'assets/images'
        }
      }
    },

    concat: {
      dist: {
        files: {
          //The foundation files do not play well with require. So we will just
          // concat them into a vendor file and define the shim in webpack.
          'assets/js/dist/vendor.min.js' : [
            'assets/vendor_components/jquery/dist/jquery.min.js',
            'assets/js/dist/app.js'
          ]
        }
      }
    },

    jshint: {
      files: ['Gruntfile.js', 'app.js', 'server/*.js'],
      options: {
        globals: {
          jQuery: true,
          __dirname: true,
          require: true,
          process: true,
          console: true
        }
      }
    },

    'string-replace': {
      dist: {
        files: {
          'views/dist/': 'views/**'
        },
        options: {
          replacements: [{
            pattern: /<!-- @timestamp -->/ig,
            replacement: function (match) {
              return new Date().getTime();
            }
          }]
        }
      }
    },

    uglify: {
      options: {
        compress: {
          drop_console: true
        }
      },
      dist: {
        files: {
          'assets/js/dist/app.js': ['assets/js/dist/app.js']
        }
      }
    },

    watch: {
      js: {
        files: [
          '<%= jshint.files %>',
          'assets/js/*.jsx',
          'assets/js/**/*.jsx',
          'assets/js/*.js',
          'assets/js/**/*.js',
          '!assets/vendor_components/**/*.js',
          '!assets/js/dist/*.js'
        ],
        tasks: ['clean:js','jshint', 'webpack:site', 'concat:dist', 'string-replace']
      },

      css: {
        files: [
          'assets/sass/*.scss',
          'assets/sass/**/*.scss',
        ],
        tasks: ['clean:css','compass:dev', 'string-replace']
      }
    },

    webpack: {
      site: {
        // webpack options

        stats: {
            // Configure the console output
            colors: false,
            modules: true,
            reasons: true
        },

        module: {
          loaders: [
            { test: /(\.js$|\.jsx$)/, exclude: /node_modules/, loader: "babel-loader"}
          ],

          preLoaders: [
            {
                test: /(\.js$|\.jsx$)/, // include .js files
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                loader: "eslint-loader"
            }
          ]
        },

        eslint: {
          configFile: '.eslintrc'
        },

        externals: {
          jquery: 'jQuery',
          pageData: 'PageData',
          ga: 'ga'
        },

        resolve: {
          root: path.resolve(__dirname, './'),
          modulesDirectories: ['assets/vendor_components', 'assets/js/modules', 'node_modules'],
          extensions: ['', '.js', '.jsx'],
          alias: {

          }
        },

        entry: {
          "app": "assets/js/app.jsx"
        },

        output: {
            path: "assets/js/dist",
            filename: "[name].js",
        },
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //TODO: add minification...
  grunt.registerTask('default', ['clean', 'jshint', 'webpack:site', 'compass:dist', 'uglify:dist', 'concat:dist', 'string-replace']);
};
