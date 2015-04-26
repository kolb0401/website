module.exports = function(grunt) {
  var path = require("path");
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'app.js', 'server/*.js', 'assets/js/*.js', 'assets/js/**/*.js', '!assets/bower_components/**/*.js', '!assets/js/dist/*.js', '!assets/js/modules/react/**/*.js'],
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

    watch: {
      files: ['<%= jshint.files %>', 'assets/js/*.jsx', 'assets/js/**/*.jsx', 'assets/sass/*.scss', 'assets/sass/**/*.scss'],
      tasks: ['clean','jshint', 'webpack:site', 'compass:dev', 'concat:dist', 'string-replace']
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
            {
                //tell webpack to use jsx-loader for all *.jsx files
                test: /\.jsx$/,
                loader: 'jsx-loader?insertPragma=React.DOM&harmony'
            }
          ]
        },

        externals: {
          jquery: "jQuery",
          foundation: "Foundation",
          modernizer: "Modernizer",
          fastClick: "FastClick",
          underscore: "_",
          react: "React"
        },

        resolve: {
          root: path.resolve(__dirname, './'),
          modulesDirectories: ['assets/bower_components', 'assets/js/modules', 'node_modules'],
          extensions: ['', '.js', '.jsx'],
        },

        entry: {
          "index": "assets/js/index.jsx"
        },

        output: {
            path: "assets/js/dist",
            filename: "[name]-page.js",
        },
      }
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

    concat: {
      dist: {
        files: {
          //The foundation files do not play well with require. So we will just
          // concat them into a vendor file and define the shim in webpack.
          'assets/js/dist/vendor.min.js' : [
            'assets/bower_components/foundation/js/vendor/jquery.js',
            'assets/bower_components/foundation/js/vendor/jquery.cookie.js',
            'assets/bower_components/foundation/js/vendor/fastclick.js',
            'assets/bower_components/foundation/js/vendor/modernizer.js',
            'assets/bower_components/foundation/js/vendor/placeholder.js',
            'assets/bower_components/foundation/js/foundation.min.js',
            'assets/bower_components/underscore/underscore-min.js',
            'assets/bower_components/react/*.js'
          ]
        }
      }
    },

    clean: ["assets/css/dist", "assets/js/dist", "views/dist"],

    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'bower.json'],
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

  //TODO: add minification...
  grunt.registerTask('default', ['clean', 'jshint', 'webpack:site', 'compass:dist', 'concat:dist', 'string-replace']);
};
